"use client";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link"
import { useEffect, useState } from "react";

export function HomeComponent() {

  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));
      const playerList = querySnapshot.docs.map(doc => doc.data());
      setPlayers(playerList as any);
    };

    const fetchCoaches = async () => {
      const querySnapshot = await getDocs(collection(db, "coaches"));
      const coachList = querySnapshot.docs.map(doc => doc.data());
      setCoaches(coachList as any);
    };

    const fetchGames = async () => {
      const querySnapshot = await getDocs(collection(db, "games"));
      const gameList = querySnapshot.docs.map(doc => doc.data());
      setGames(gameList as any);
    };

    fetchPlayers();
    fetchCoaches();
    fetchGames();
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-[url('/placeholder.svg?height=500&width=1200')] bg-cover bg-center">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                Basketball Team
              </div>
              <h1 className="lg:leading-tighter text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-[4.5rem] 2xl:text-[5rem] text-foreground">
                Power Vikings Basketball Team
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Welcome to the official website of the Power Vikings Basketball team. Discover our team, coaches, players, and
                upcoming games.
              </p>
              <div className="space-x-4 mt-6">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Tickets
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                width={300}
                height={300}
                alt="Acme Basketball Logo"
                className="w-full max-w-[300px] aspect-square object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-[1000px] mx-auto gap-8 md:grid-cols-2">
            <div>
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">About Us</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Team&apos;s History</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The Acme Basketball team has a rich history dating back to 1985. We&apos;ve been a fixture in the local
                community, inspiring generations of players and fans. Our team is known for its dedication,
                sportsmanship, and commitment to excellence on and off the court.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Acme Basketball Team"
                className="w-full max-w-[400px] aspect-[4/3] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-[1000px] mx-auto gap-8 md:grid-cols-2">
            <div>
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                Our Coaches
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Coaching Staff</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our coaching staff is dedicated to developing our players and leading the team to success. Get to know
                our head coach and assistant coaches.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {coaches.map((coach: any, index: number) => (
                <div key={index} className="bg-background rounded-lg p-4">
                  <h3 className="text-lg font-bold">{coach.name}</h3>
                  <p className="text-muted-foreground">{coach.role}</p>
                  {coach.imageUrl && <img src={coach.imageUrl} alt={coach.name} className="w-full max-w-[300px] aspect-[3/2] object-cover rounded-lg" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-[1000px] mx-auto gap-8 md:grid-cols-2">
            <div>
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                Our Players
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Team</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get to know the key players on our team. From seasoned veterans to rising stars, these are the athletes
                who make our team great.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {players.map((player: any, index: number) => (
                <div key={index} className="bg-background rounded-lg p-4">
                  <h3 className="text-lg font-bold">{player.name}</h3>
                  <p className="text-muted-foreground">{player.position}</p>
                  {player.imageUrl && <img src={player.imageUrl} alt={player.name} className="w-full max-w-[300px] aspect-[3/2] object-cover rounded-lg" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-[1000px] mx-auto gap-8 md:grid-cols-2">
            <div>
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                Upcoming Games
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Schedule</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out our upcoming games and come support the team!
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {games.map((game: any, index: number) => (
                <div key={index} className="bg-background rounded-lg p-4">
                  <h3 className="text-lg font-bold">{game.teamA} vs {game.teamB}</h3>
                  <p className="text-muted-foreground">{new Date(game.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-[1000px] mx-auto gap-8 md:grid-cols-2">
            <div>
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                Latest News
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Team Updates</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stay up to date with the latest news and updates about our team.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="bg-background rounded-lg p-4">
                <img
                  src="/placeholder.svg"
                  width={300}
                  height={200}
                  alt="News Article 1"
                  className="w-full max-w-[300px] aspect-[3/2] object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold mt-2">Acme Basketball Wins Big Game</h3>
                <p className="text-muted-foreground">
                  The Acme Basketball team secured a big win against their rivals, cementing their place in the league
                  standings.
                </p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <img
                  src="/placeholder.svg"
                  width={300}
                  height={200}
                  alt="News Article 2"
                  className="w-full max-w-[300px] aspect-[3/2] object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold mt-2">New Player Joins the Team</h3>
                <p className="text-muted-fore" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
