// our domain.com/new-meetup
import { useRouter } from "next/router";
import Head from 'next/head';
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupJandler(enteredMeetUpData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  // async function addMeetupJandler(enteredMeetUpData){
  //     const response=await fetch('/api/new-meetup',{
  //         method:'POST',
  //         body: JSON.stringify(enteredMeetUpData),
  //         headers:{
  //             'Content-type':'application/json'
  //         }
  //     });
  //     console.log(enteredMeetUpData);
  //     const data=await response.json();
  //     console.log(data);
  // }
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking oportunity."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupJandler} />
    </Fragment>
  );
}
export default NewMeetupPage;

// https://i.kym-cdn.com/entries/icons/original/000/019/679/dust_2.jpg
