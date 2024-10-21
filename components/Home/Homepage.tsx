"use client"
import { SignedIn, UserButton } from "@clerk/nextjs"
import Header from "../Header"
import Notifications from "../Notifications"
import Image from 'next/image';
import Link from 'next/link';
import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import { dateConverter } from '@/lib/utils';
import { useEffect, useState } from "react";
import DarkLightMode from "../DarkLightMode/DarkLightMode";

const Homepage = ({ roomDocuments, email, userId }: any) => {
    // Ambil mode dari localStorage saat halaman dimuat
    const getInitialTheme = () => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme === 'dark';
        }
        return true; // Default ke dark mode
    };

    const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

    // Simpan perubahan mode ke localStorage
    const toggleButton = () => {
        setIsDark(!isDark);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', !isDark ? 'dark' : 'light');
        }
    };

    useEffect(() => {
        // Saat pertama kali halaman dimuat, terapkan mode yang tersimpan di localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
        }
    }, []);

    return (
        <div className={`home-container md:px-20 ${isDark ? "dark" : "bg-gray-100"}`} >
            <Header className="sticky left-0 top-0">
                <div className="flex items-center gap-2 lg:gap-4">
                    <DarkLightMode toggleButton={toggleButton} isDark={isDark} />
                    <Notifications isDark={isDark} />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </Header>

            {roomDocuments.data.length > 0 ? (
                <div className="document-list-container">
                    <div className="document-list-title">
                        <h3 className="text-28-semibold text-black dark:text-white">All documents</h3>
                        <AddDocumentBtn
                            userId={userId}
                            email={email}
                        />
                    </div>
                    <ul className="document-ul">
                        {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
                            <li key={id} className="document-list-item bg-gray-200">
                                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                                    <div className="hidden rounded-md dark:bg-dark-500 p-2 sm:block">
                                        <Image
                                            src="/assets/icons/doc.svg"
                                            alt="file"
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="line-clamp-1 text-lg text-black dark:text-white">{metadata.title}</p>
                                        <p className="text-sm font-light text-gray-700 dark:text-blue-100">Created about {dateConverter(createdAt)}</p>
                                    </div>
                                </Link>
                                <DeleteModal roomId={id} />
                            </li>
                        ))} 
                    </ul>
                </div>
            ) : (
                <div className="document-list-empty">
                    <Image
                        src="/assets/icons/doc.svg"
                        alt="Document"
                        width={40}
                        height={40}
                        className="mx-auto"
                    />

                    <AddDocumentBtn
                        userId={userId}
                        email={email}
                    />
                </div>
            )}
        </div>
    )
}

export default Homepage;
