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
import { getSession, signIn, useSession } from "next-auth/react";
import FormButton from "./FormButton";
import toast from "react-hot-toast";
import axios from "axios";


interface FormData {
  image : any;
  companyName : string;
}
const ProfileEdit = () => {
  const {data:session,update} = useSession();

  const [btnLoader, setBtnLoader] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    image: "",
    companyName: session?.user.name || "",
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

 
  
  const updateSession = async (name,image)=>{
    await update({
       ...session,
       user : {
           ...session.user,

       name : name,
       image : image
       }
   });
}

 
const handleSubmit = async (e) => {
  e.preventDefault();
  setBtnLoader(true);

  try {
    // 1. Upload the image to PHP API
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

    // Extract the image URL from the PHP API response
    const imageUrl = uploadResponse.data.url;

    // 2. Send image URL and company name to another API
    const finalPayload = {
      imageUrl,
      companyName: formData.companyName,
    };

    console.log(finalPayload);

    const saveResponse = await axios.post("/api/profile/update", finalPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (saveResponse.status !== 200) {
      throw new Error("Failed to save profile.");
    }

    


    updateSession(finalPayload.companyName,finalPayload.imageUrl);
    console.log("Updated session:", session);
    
    toast.success('Profile updated successfully');

    
    
    console.log("Profile updated successfully:", saveResponse.data);

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
