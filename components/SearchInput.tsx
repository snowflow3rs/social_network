'use client';
import { IoSearchSharp } from 'react-icons/io5';

const SearchInput = () => {
    return (
        <form className="flex items-center gap-2">
            <input type="text" placeholder="Search…" className="input input-bordered rounded-full" />
            <button className="btn btn-circle bg-primary-500 text-white">
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
        </form>
    );
};
export default SearchInput;
