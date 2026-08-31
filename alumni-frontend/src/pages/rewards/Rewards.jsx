import { useEffect, useState } from "react";
import { TrophyFill } from "react-bootstrap-icons";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";

import "./Rewards.css";

function Rewards() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);

      const totalResponse = await API.get("rewards/total/");
      const historyResponse = await API.get("rewards/");

      setTotalPoints(totalResponse.data.total_points || 0);
      setHistory(historyResponse.data || []);
    } catch (error) {
      console.log("Rewards Error:", error);
      setTotalPoints(0);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="rewards-container">

        {/* Header */}
        <div className="rewards-header">
          <div>
            <h1>🏆 Rewards</h1>
            <p>Earn points by actively participating in the alumni portal.</p>
          </div>
        </div>

        {/* Total Points */}
        <div className="total-points-card">
          <div className="trophy-icon">
            <TrophyFill />
          </div>

          <div>
            <p>Total Reward Points</p>

            <h2>
              {loading ? "..." : totalPoints}
            </h2>

            <span>Keep participating to earn more points!</span>
          </div>
        </div>

        {/* History */}
        <div className="points-history">

          <div className="section-title">
            <h2>📜 Points History</h2>
          </div>

          {loading ? (
            <p className="loading-text">
              Loading reward history...
            </p>
          ) : history.length === 0 ? (
            <p className="loading-text">
              No reward points found.
            </p>
          ) : (
            <div className="reward-table-container">

              <table className="reward-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Reason</th>
                    <th>Points</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((reward) => (
                    <tr key={reward.id}>

                      <td>
                        #{reward.id}
                      </td>

                      <td>
                        {reward.reason}
                      </td>

                      <td>
                        <span className="points-badge">
                          +{reward.points}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          reward.created_at
                        ).toLocaleDateString("en-IN")}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Rewards;