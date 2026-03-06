import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, StarsIcon } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { checkUser } from '@/lib/checkUser';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import AuthButtons from './auth-buttons';

const Header = async () => {
    await checkUser();
    const session = await auth.api.getSession({ headers: await headers() });

    return (
        <header className='bg-background/80 fixed top-0 w-full z-50 backdrop-blur-md supports-[backdrop-filter:blur]:bg-background/60 '>

            <nav className='container mx-auto p-4 h-14 md:h-16 flex items-center justify-between'>
                <Link href="/" >
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={200}
                        height={60}
                        className="w-28 sm:w-36 md:w-44 lg:w-52 h-auto"
                    />

                </Link>

                <div className='flex items-center space-x-4'>
                    {session?.user && (
                        <>
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
                                        <Link href={"/resume"} className='flex items-center gap-2'>
                                            <FileText className=' h-4 w-4' />
                                            Build Resume
                                        </Link>

                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem>
                                <Link href={"/cover-letter"}>
                                   <PenBox className=' h-4 w-4' />
                                    <span className='hidden md:block'>Cover Letter</span>
                                </Link>
                            </DropdownMenuItem> */}
                                    <DropdownMenuItem>
                                        <Link href={"/interview/mock"} className='flex items-center gap-2' >
                                            <GraduationCap className=' h-4 w-4' />
                                            <span className=' md:block'>Mock Interview</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={"/interview"} className='flex items-center gap-2'>
                                            <GraduationCap className=' h-4 w-4' />
                                            Interview Prep
                                        </Link>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}

                    {!session?.user && (
                        <>
                            <Link href={"/sign-in"}>
                                <Button variant="outline" className=' md:block'>Sign In</Button>
                            </Link>
                            <Link href={"/sign-up"}>
                                <Button className=' md:block'>Sign Up</Button>
                            </Link>
                        </>
                    )}

                    {session?.user && (
                        <AuthButtons user={session.user} />
                    )}
                </div>
            </nav>

        </header>
    )
}

export default Header