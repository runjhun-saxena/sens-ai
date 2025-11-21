import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { checkUser } from '@/lib/checkUser';

const Header = async() => {
    await checkUser();
    return (
        <header className='bg-background/80 fixed top-0 w-full z-50 backdrop-blur-md supports-[backdrop-filter:blur]:bg-background/60 '>

            <nav className='container mx-auto p-4 h-16 flex items-center justify-between '>
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={200} height={60} />

                </Link>

                <div className='flex items-center space-x-4'>
                    <SignedIn>
                        <Link href={"/dashboard"}>
                            <Button variant={"outline"}>
                                <LayoutDashboard className=' h-4 w-4' />
                                <span className='hidden md:block'>Industry Insights</span>
                            </Button>
                        </Link>
                    

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <Link href={"/dashboard"}>
                                <Button>
                                    <StarsIcon className=' h-4 w-4' />
                                    <span className='hidden md:block'> Growth tools </span>
                                    <ChevronDown className=' h-4 w-4' />
                                </Button>
                            </Link>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>

                            <DropdownMenuItem>
                                <Link href={"/resume"}>
                                                                <FileText className=' h-4 w-4' />
                                <span className='hidden md:block'> Build Resume </span>
                                </Link>

                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                                <Link href={"/cover-letter"}>
                                   <PenBox className=' h-4 w-4' />
                                    <span className='hidden md:block'>Cover Letter</span>
                                </Link>
                            </DropdownMenuItem> */}
                                                        <DropdownMenuItem>
                                <Link href={"/interview/mock"}>
                                    <GraduationCap className=' h-4 w-4' />
                                    <span className='hidden md:block'>Mock Interview</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={"/interview"}>
                                    <GraduationCap className=' h-4 w-4' />
                                    <span className='hidden md:block'>Interview Prep</span>
                                </Link>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                    </SignedIn>

            <SignedOut>
                <SignInButton>
                    <Button variant="outline" className='hidden md:block'>Sign In</Button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
                <UserButton
                appearance={{
                    elements: {
                        avatarBox: "w-8 h-8",
                        userButtonPopoverCard: "w-60",
                        userPreviewMainIdentifier: "w-60",
                    }
                }}
                afterSignOutUrl='/'
                />
            </SignedIn>
                </div>
            </nav>

        </header>
    )
}

export default Header