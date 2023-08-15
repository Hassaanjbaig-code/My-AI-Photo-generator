import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Formfield, Loader, CreateCard } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectImage, setSelectImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ai-image-xkc8.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );
        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  const handleChange = (e) =>
    setform({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setform({ ...form, prompt: randomPrompt });
  };
  const [imageArray, setImageArray] = useState([]);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://ai-image-xkc8.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );
        const data = await response.json();
        const newImageArray = data.photo.map(
          (item) => `data:image/jpeg;base64,${item}`
        );
        setImageArray(newImageArray);
      } catch (error) {
        alert("An error occurred while generating images.");
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please fill a form for generate a cool Image.");
    }
  };

  const handleImageSelect = (image, index) => {
    setSelectImage(index); // Use the setter function to update the state
    setform({ ...form, photo: image });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imagindative and visually stunning images generated through AI
          share them with the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Formfield
            LabelName="Your name"
            type="text"
            name="name"
            placeholder="Enter you name"
            value={form.name}
            handleChange={handleChange}
          />
          <Formfield
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSuprpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="flex gap-1 max-sm:flex-col">
            {imageArray.length !== 0 ? (
              imageArray.map((item, index) => (
                <div
                  key={index}
                  className={
                    (selectImage === index ? " border-8 border-blue-500" : "") +
                    "relative bg-gray-50 border border-gray-300 text-gray-900" +
                    "text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" +
                    "w-64 p-3 h-64 flex justify-center items-center flex-col gap-2"
                  }
                  onClick={() => handleImageSelect(item, index)}
                >
                  <img
                    key={index}
                    src={item}
                    alt={form.prompt}
                    className="w-9/12 h-9/12 object-contain"
                  />
                </div>
              ))
            ) : (
              <div
                className="relative bg-gray-50 border border-gray-300 text-gray-900
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
        w-64 p-3 h-64 flex justify-center items-center"
              >
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 opacity-40 object-contain"
                />

                {generatingImg && (
                  <div
                    className="absolute inset-0 z-0 flex justify-center items-center
            bg-[rgba(0,0,0,0,0.5)] rounded-lg"
                  >
                    <Loader />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium 
          rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can shre it with
            others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md 
            text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "SHaring..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
