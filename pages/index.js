import Head from 'next/head';

import { MongoClient } from "mongodb";
import MeetUpLIst from "../components/meetups/MeetupList";
import { Fragment } from 'react';
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetups",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5 , 12345 some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetups",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 14 , 54743 some City",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {

  return (
    <Fragment>
    <Head>
    <title>React Meetups</title>
    <meta name='description' content='Browse a huge list of highly active react meetups!'/>
    </Head>
    <MeetUpLIst meetups={props.meetups} />;
    </Fragment>
  )
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://jarrel_14:YPtSLQbUVUBtwL8I@cluster0.f34cpmb.mongodb.net/?retryWrites=true&w=majority"
  );
  // The .db command will create a new database if it doesn't exist, otherwise it will return the existing database.
  const db = client.db();
  // The .collection command will pick up the data from the db 
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetups) => ({
        title: meetups.title,
        address: meetups.address,
        image: meetups.image,
        id: meetups._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
