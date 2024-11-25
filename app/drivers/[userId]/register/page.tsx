'use client'

import React, { useEffect, useState } from 'react';
import AddUserDetails from '@/components/Forms/AddUserDetails';
import { getUser } from '@/lib/actions/user.actions';
import { useParams } from 'next/navigation';

const Register = () => {
    const params = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (typeof params.userId === 'string') {
                const fetchedUser = await getUser(params.userId);
                if (fetchedUser) {
                    setUser(fetchedUser);
                } else {
                    console.error("User not found or failed to fetch.");
                }
            } else {
                console.error("Invalid userId.");
            }
        };

        fetchUser();
    }, [params.userId]);

    return (
        <div className="bg-bannerImg flex h-screen max-h-screen">
            <section className="remove-scrollbar container text-white-500">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <img 
                        src="/assets/images/nav logom.png"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="mb-12 h-10 w-fit"
                    />
                    {user ? <AddUserDetails user={user} /> : <p>User not found.</p>}
                </div>
            </section>
            <img 
                src="/assets/images/zback.png"
                height={1000}
                width={1000}
                alt="image"
                className="side-img max-w-[390px]"
            />
        </div>
    );
};

export default Register;
