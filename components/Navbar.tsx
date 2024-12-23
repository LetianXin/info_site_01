import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { auth, signOut, signIn } from "@/auth"


const Navbar = async () => {
    const session = await auth()

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans sticky top-0 z-50">
            <nav className="flex justify-between items-center">
                <Link href="/" >
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/Visa">
                                <span>Visa</span>
                            </Link>

                            <Link href="/Dashboard">
                                <span>Dashboard</span>
                            </Link>

                            <Link href="/Internet">
                                <span>Internet</span>
                            </Link>

                            <Link href="/Payment">
                                <span>Payment</span>
                            </Link>

                            <Link href="/Transportation">
                                <span>Transport</span>
                            </Link>


                            <form action={async () => {
                                "use server";

                                await signOut({redirectTo: "/"})

                            }} >
                                <button type="submit">Logout</button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={ async () => {
                            "use server" ;

                            await signIn('github')
                            }} >

                            <button type="submit">
                                Login
                            </button>
                        </form>
                    )}

                </div>

            </nav>
        </header>
    )
}

export default Navbar