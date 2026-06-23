import { useState } from "react";

import Header from "../components/Header";
import TeamSelect from "../components/TeamSelect";
import PredictionCard from "../components/PredictionCard";


import api from "../services/api";
import { useEffect } from "react";

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [venues, setVenues] = useState([]);

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [venue, setVenue] = useState("");

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      if (team1 && team2) {
        try {
          const response = await api.get("/venues", {
            params: { team1, team2 }
          });
          setVenues(response.data);
        } catch (error) {
          console.error("Failed to fetch venues", error);
        }
      } else {
        setVenues([]);
      }
      setVenue("");
    };
    fetchVenues();

    // Reset toss winner if it's no longer one of the selected teams
    const currentTossOptions = [team1, team2].filter(Boolean);
    if (!currentTossOptions.includes(tossWinner)) {
      setTossWinner("");
    }
  }, [team1, team2]);

  const fetchMetadata = async () => {
    try {
      const response = await api.get("/metadata");
      setTeams(response.data.teams);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePredict = async () => {
    if (
      !team1 ||
      !team2 ||
      !tossWinner ||
      !venue
    ) {
      alert("Please fill all fields");
      return;
    }

    const selectedVenueObj = venues.find(v => v.venue === venue);
    const resolvedCity = selectedVenueObj ? selectedVenueObj.city : "";

    if (!resolvedCity) {
      alert("Invalid venue/city mapping");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/predict", {
        team1,
        team2,
        toss_winner: tossWinner,
        toss_decision: "bat",
        venue,
        city: resolvedCity,
      });

      setPrediction(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Prediction failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <div className="max-w-3xl mx-auto">
        <Header />

        <div className="bg-slate-900 p-8 rounded-xl space-y-5">

          <TeamSelect
            label="Team 1"
            value={team1}
            onChange={(e) =>
              setTeam1(e.target.value)
            }
            options={teams}
          />

          <TeamSelect
            label="Team 2"
            value={team2}
            onChange={(e) =>
              setTeam2(e.target.value)
            }
            options={teams}
          />

          <TeamSelect
            label="Toss Winner"
            value={tossWinner}
            onChange={(e) =>
              setTossWinner(e.target.value)
            }
            options={[team1, team2].filter(Boolean)}
          />

          <TeamSelect
            label="Venue"
            value={venue}
            onChange={(e) =>
              setVenue(e.target.value)
            }
            options={venues.map((v) => v.venue)}
          />

          <button
            onClick={handlePredict}
            disabled={loading}
            className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              disabled:bg-gray-500
              text-white
              p-3
              rounded-lg
              font-semibold
            "
          >
            {loading
              ? "Predicting..."
              : "Predict Winner"}
          </button>

          {prediction && (
            <PredictionCard
              winner={prediction.winner}
              probability={
                prediction.confidence
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;