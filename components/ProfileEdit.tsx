import { Pencil } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn, useSession } from "next-auth/react";
import FormButton from "./FormButton";
import toast from "react-hot-toast";


interface FormData {
  image : any;
  companyName : string;
}
const ProfileEdit = () => {
  const session = useSession();
  const [btnLoader, setBtnLoader] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    image: "",
    companyName: session.data?.user.name || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      // Update the image file in state
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoader(true);

    try {
      // 1. Upload the image to PHP API
      const imageData = new FormData();
      imageData.append("image", formData.image);

      const uploadResponse = await fetch("https://idea-images.vetaai.com/", {
        method: "POST",
        body: imageData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image.");
      }

      const uploadResult = await uploadResponse.json();

      // Extract the image URL from the PHP API response
      const imageUrl = uploadResult.url;

      // 2. Send image URL and company name to another API
      const finalPayload = {
        imageUrl,
        companyName: formData.companyName,
      };
      console.log(finalPayload)

      const saveResponse = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save profile.");
      }

      const saveResult = await saveResponse.json();

      toast.success('Profile updated successfully');
      
      console.log("Profile updated successfully:", saveResult);

      // Optionally reset the form or notify the user
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="absolute h-16 w-16 inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 cursor-pointer">
          <Pencil className="text-white w-6 h-6" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading text-center mb-8 text-xl">
            Update Profile
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="space-y-4 font-body">
              {/* Profile Image Input */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Profile Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-500 rounded-lg px-2 py-3"
                />
              </div>

              {/* Company Name Input */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-500 rounded-lg px-2 py-3"
                />
              </div>

              {/* Submit Button */}
              <FormButton state={btnLoader} />
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEdit;
