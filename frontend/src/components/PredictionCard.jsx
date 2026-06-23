const PredictionCard = ({
  winner,
  probability,
}) => {
  return (
    <div className="mt-8 bg-green-600 p-6 rounded-xl text-white">

      <h2 className="text-lg">
        Predicted Winner
      </h2>

      <h1 className="text-4xl font-bold mt-2">
        {winner}
      </h1>

      <div className="mt-4">

        <div className="flex justify-between">
          <span>Confidence</span>
          <span>{probability}%</span>
        </div>

        <div className="w-full bg-green-300 rounded-full h-4 mt-2">
          <div
            className="bg-white h-4 rounded-full"
            style={{
              width: `${probability}%`,
            }}
          />
        </div>

      </div>

    </div>
  );
};

export default PredictionCard;