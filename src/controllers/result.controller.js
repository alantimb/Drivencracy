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
      { $match: { choiceId: { $in: choicesResult.map((c) => c._id) } } },
      { $group: { _id: "$choiceId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    

    const mostVoted = await choicesCollection
      .find({ _id: voteslist[0]._id })
      .toArray();

    if (mostVoted.length === 0) {
      return res.status(404).send("Enquete sem votos");
    }

    await resultCollection.insertOne({
      title: pollResult.title,
      expireAt: pollResult.expireAt,
      result: {
        title: mostVoted[0].title,
        votes: voteslist[0].count,
      },
    });

    const result = await resultCollection.findOne({ title: pollResult.title}).toArray()

    console.log(result);

    res.send("oi");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
