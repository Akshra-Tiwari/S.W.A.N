const Report =
require("../models/Report");

const getAnalytics =
async (req, res) => {
  try {

    const totalReports =
      await Report.countDocuments();

    const pending =
      await Report.countDocuments({
        status: "pending",
      });

    const investigating =
      await Report.countDocuments({
        status: "under_review",
      });

    const resolved =
      await Report.countDocuments({
        status: "resolved",
      });

    const high =
      await Report.countDocuments({
        severity: "high",
      });

    const medium =
      await Report.countDocuments({
        severity: "medium",
      });

    const low =
      await Report.countDocuments({
        severity: "low",
      });

    const reportsByStatus =
      await Report.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    const reportsBySeverity =
      await Report.aggregate([
        {
          $group: {
            _id: "$severity",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    const monthlyReports =
      await Report.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month:
                  "$createdAt",
              },
              year: {
                $year:
                  "$createdAt",
              },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    const topLocations =
      await Report.aggregate([
        {
          $group: {
            _id:
              "$location.address",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 10,
        },
      ]);

    const resolutionRate =
      totalReports > 0
        ? (
            resolved /
            totalReports
          ) * 100
        : 0;

    res.json({
      totalReports,

      pending,

      investigating,

      resolved,

      high,

      medium,

      low,

      reportsByStatus,

      reportsBySeverity,

      monthlyReports,

      topLocations,

      resolutionRate:
        Number(
          resolutionRate.toFixed(
            2
          )
        ),
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

module.exports = {
  getAnalytics,
};