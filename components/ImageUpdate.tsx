import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signIn } from "next-auth/react";
import { Camera, Edit2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import FormButton from "./FormButton";

const ImageUpdate = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    image: null,
    companyName: session?.user?.name || "",
  });
  const [selectedImage, setSelectedImage] = useState(null); // For image preview
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isHoveringInput, setIsHoveringInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Edit mode for input field
  const [btnLoader, setBtnLoader] = useState(false); // Button loading state

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview the selected image
      setFormData({ ...formData, image: file }); // Update the form data
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image && !isEditing) {
      toast.error("No changes to update.");
      return;
    }

    setBtnLoader(true);

    try {
      let imageUrl = session?.user?.image;

      // 1. Upload the image to PHP API if a new image is selected
      if (formData.image) {
        const imageData = new FormData();
        imageData.append("image", formData.image);

        const uploadResponse = await axios.post("https://idea-images.vetaai.com/", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.status !== 200) {
          throw new Error("Failed to upload image.");
        }

        imageUrl = uploadResponse.data.url;
      }

      // 2. Send image URL and user name to another API
      const finalPayload = {
        imageUrl : imageUrl ? imageUrl : session.user.image,
        companyName: formData.companyName,
      };

      const saveResponse = await axios.post("/api/profile/update", finalPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (saveResponse.status !== 200) {
        throw new Error("Failed to save profile.");
      }

      // 3. Update session and notify user
      await signIn("credentials", {
        email: session.user.email,
        password: "image-update",
      });

      toast.success("Profile updated successfully!");

      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile.");
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <div className="flex w-full items-center flex-col">
      {/* Image Section */}
      <div
        className="relative group w-20 h-20 flex items-center gap-4"
        onMouseEnter={() => setIsHoveringImage(true)}
        onMouseLeave={() => setIsHoveringImage(false)}
      >
        <Avatar className="w-full h-full text-xl">
          <AvatarImage
            src={selectedImage || session?.user?.image || ""}
            alt="User Avatar"
          />
          <AvatarFallback>
            {session?.user?.name?.substring(0, 2).toUpperCase() || "NA"}
          </AvatarFallback>
        </Avatar>

        {/* Camera Icon (show on hover) */}
        {session.user.role == "admin" && (isHoveringImage && (
          <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full cursor-pointer">
            <label className="flex items-center gap-2 text-white w-full h-full cursor-pointer">
              <Camera className="w-6 h-6 mx-auto" />
              <input
                type="file"
                accept="image/*"
                className="hidden w-full h-full cursor-pointer"
                onChange={handleImageChange}
              />
            </label>
          </div>
        ))}
        
      </div>

      {/* Name Input Section */}
      <div
        className="relative w-full mt-4 text-center"
        onMouseEnter={() => setIsHoveringInput(true)}
        onMouseLeave={() => setIsHoveringInput(false)}
      >
        <input
          className={`font-body text-xl font-medium text-foreground bg-background text-center ${
            isEditing ? "border-2 border-blue-500 rounded-lg py-2" : "border-none"
          }`}
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          disabled={!isEditing}
        />

        {/* Pencil Icon (show on hover) */}
        
        {session.user.role == "admin" && (isHoveringInput && !isEditing && (
          <button
            className="absolute  top-1/2 transform -translate-y-1/2 text-blue-500"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="w-5 h-5" />
          </button>
        ))}
        
      </div>

      {/* Update Button */}
      {(selectedImage || isEditing) && (
        <FormButton
          className={`mt-4 px-10 w-auto py-2 h-10 text-sm text-white bg-blue-700 rounded hover:bg-blue-600 font-body ${
            btnLoader ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          state={btnLoader}
        />
      )}
    </div>
  );
};

export default ImageUpdate;
