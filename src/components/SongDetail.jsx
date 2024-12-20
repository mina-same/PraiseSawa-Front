import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner component
import backImg from "../assets/images/background-img.png";
import mainImg from "../assets/images/mainImg.png";
import logo from "../assets/images/logo.png";
import Overview from "./Overview";
import ArSong from "./ArSong";
import TranslatedSong from "./TranslatedSong";
import TransliteratedSong from "./TransliteratedSong";

const SongDetail = () => {
  const { id } = useParams(); // Get the dynamic id from the URL
  const [activeTab, setActiveTab] = useState("overview"); // Manage the active tab
  const [song, setSong] = useState(null); // State to hold song data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ArbSongs/getArbSongBySongID/${id}`);
        setSong(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching song data:", err.response ? err.response.data : err.message);
        setError("Error fetching song data");
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  // Handler to set the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#ffbb02" size={50} />
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-start items-start gap-4 p-4 w-full h-full overflow-hidden">
      {/* Background section with gradient and main image */}
      <div className="w-full h-[300px] relative flex justify-start items-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-950">
          <img src={backImg} alt="Background" className="object-cover w-full h-full" />
        </div>

        {/* Song info section */}
        <div className="relative z-10 flex items-center p-4 space-x-4">
          <div className="w-[200px] h-[200px]">
            <img src={mainImg} alt="Main" className="w-full h-full object-cover rounded-md" />
          </div>

          <div className="flex flex-col space-y-2">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
              {song.title}
            </h1>
            <h2 className="text-white text-lg md:text-xl">{song.subtitle}</h2>
            <p className="text-white opacity-70 text-base md:text-lg">{song.description}</p>

            <div className="flex items-center space-x-3 mt-2">
              <img src={logo} alt="Logo" className="w-6 h-6" />
              <span className="text-white text-base md:text-lg font-bold">{song.likes} likes</span>
              <div className="w-[5px] h-[5px] bg-white rounded-full" />
              <span className="text-white/70 text-base md:text-lg">{song.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="w-full">
          {/* Tabs section */}
          <div className="w-full flex justify-center items-center gap-10 mt-10">
            <button
              className={`text-lg ${activeTab === "overview" ? "text-[#000] font-bold" : "text-[#a5a5a5]"}`}
              onClick={() => handleTabClick("overview")}
            >
              Overview
            </button>
            <button
              className={`text-lg ${activeTab === "arabic" ? "text-[#000] font-bold" : "text-[#a5a5a5]"}`}
              onClick={() => handleTabClick("arabic")}
            >
              Arabic
            </button>
            <button
              className={`text-lg ${activeTab === "translated" ? "text-[#000] font-bold" : "text-[#a5a5a5]"}`}
              onClick={() => handleTabClick("translated")}
            >
              Translated
            </button>
            <button
              className={`text-lg ${activeTab === "transliterated" ? "text-[#000] font-bold" : "text-[#a5a5a5]"}`}
              onClick={() => handleTabClick("transliterated")}
            >
              Transliterated
            </button>
            <button
              className={`text-lg ${activeTab === "chords" ? "text-[#000] font-bold" : "text-[#a5a5a5]"}`}
              onClick={() => handleTabClick("chords")}
            >
              Chords
            </button>
          </div>

        {/* Render the content based on active tab */}
        <div className="w-full mt-4">
          {activeTab === "overview" && <Overview song={song} />}
          {activeTab === "arabic" && <ArSong song={song} />}
          {activeTab === "translated" && <TranslatedSong song={song} />}
          {activeTab === "transliterated" && <TransliteratedSong song={song} />}
          {activeTab === "chords" && <div className="text-black text-2xl font-bold justify-center items-center text-center m-16">Chords content goes here</div>}
        </div>

      </div>
    </div>
  );
};

export default SongDetail;



