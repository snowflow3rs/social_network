'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Input } from '../ui/input';
import HeadlessTippy from '@tippyjs/react/headless';
import Link from 'next/link';
import useDebounce from '@/lib/hooks/useDebounce';

import UserCard from '../cards/UserCard';
import UserSearchCard from '../cards/UserSearchCard';
import { fetchSearchUser } from '@/lib/actions/user.actions';

interface Props {
    routeType: string;
    tabIndex: number;
}

export const SearchBar = ({ routeType, tabIndex }: Props) => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResult, setSearchResult] = useState<any>([]);
    const [showResult, setShowResult] = useState<boolean>(true);
    const debounced = useDebounce(searchValue, 300);

    // query after 0.3s of no input
    useEffect(() => {
        if (debounced) {
            const dataSearch = async () => {
                const result = await fetchSearchUser({
                    searchString: debounced,
                    pageNumber: 1,
                    pageSize: 25,
                });
                setSearchResult(result.users);
            };
            dataSearch();
        }
    }, [debounced]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };
    const handleBlurSearch = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        setShowResult(false);
    };

    const handleOutofTippy = () => {
        setShowResult(false);
    };

    return (
        <div>
            <HeadlessTippy
                onClickOutside={handleOutofTippy}
                interactive={true}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className=" min-w-[460px]" tabIndex={tabIndex} {...attrs}>
                        <div className="w-full py-[8px]  shadow-md bg-dark-3 rounded-[8px] flex flex-col max-h-[calc(100vh - 96px - 60px)] max-h-[734px]">
                            <div
                                // to={`${config.routes.search}?q=${searchValue}`}
                                className="flex items-center py-[9px] px-[16px] cursor-pointer"
                            >
                                <Image
                                    src="/assets/search-gray.svg"
                                    alt="search"
                                    width={20}
                                    height={20}
                                    className="object-contain mr-[8px]"
                                />
                                <span className="text-white">{searchValue}</span>
                            </div>
                            <h4 className="text-white text-base-semibold py-[12px] px-[10px]">Account</h4>
                            {searchResult.map((user: any) => (
                                <UserSearchCard
                                    key={user.id}
                                    id={user.id}
                                    username={user.username}
                                    name={user.name}
                                    imgUrl={user.image}
                                    userType="User"
                                />
                            ))}
                            <Link
                                href="/search"
                                className=" items-center py-[14px] px-[10px]  hover:bg-zinc-900 "
                                onClick={handleBlurSearch}
                            >
                                <span className=" text-base-semibold text-white ">
                                    View all results for "{searchValue}"
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            >
                <div className="searchbar w-full border border-transparent focus-within:border-gray-1 max-sm:hidden ">
                    <Image
                        src="/assets/search-gray.svg"
                        alt="search"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    <Input
                        id="text"
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleInput}
                        onFocus={() => setShowResult(true)}
                        placeholder={`${routeType !== '/search' ? 'Search ' : 'Search creators'}`}
                        className="no-focus searchbar_input  w-[400px] "
                    />
                </div>
            </HeadlessTippy>
        </div>
    );
};
