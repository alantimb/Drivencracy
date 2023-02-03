import { ObjectId } from "mongodb";
import {
  choicesCollection,
  pollsCollection,
  resultCollection,
  votesCollection,
} from "../database/db.js";

export async function giveResult(req, res, next) {
  const id = req.params.id;

  try {
    const pollResult = await pollsCollection.findOne({ _id: ObjectId(id) });

    if (!pollResult) {
      return res.status(404).send("Enquete não existe");
    }

    const choicesResult = await choicesCollection
      .find({ pollId: new ObjectId(id) })
      .toArray();

    const voteslist = await votesCollection.aggregate([
      { $match: { choiceId: { $in: choicesResult.map((choice) => choice._id) } } },
      { $group: { _id: "$choiceId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]).toArray();

    const mostVoted = await choicesCollection
      .find({ _id: voteslist[0]._id })
      .toArray();

    await resultCollection.insertOne({
      title: pollResult.title,
      expireAt: pollResult.expireAt,
      result: {
        title: mostVoted[0].title,
        votes: voteslist[0].count,
      },
    });

    const result = await resultCollection
      .find({ title: pollResult.title })
      .toArray();

    console.log(result);

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
