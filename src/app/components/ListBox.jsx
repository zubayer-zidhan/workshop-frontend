import { Fragment, useState , useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useSelector, useDispatch } from 'react-redux';
import { updateWorkshopURL } from '../../slices/getWorkshopsSlice';
import { updateBookingDataCity } from '../../slices/bookingDataCitySlice';
import { updateBookingDataWorkshop } from '../../slices/bookingDataWorkshopSlice';


const ListBox = (props) => {
    const [menuItems, setMenuItems] = useState([]);
    const [selected, setSelected] = useState(0);
    const citySelected = useSelector((state) => state.isCitySelected.value);

    const dispatch = useDispatch();



    

    // useEffect for fetching data at start
    useEffect(() => {

        if(props.name === "cities") {
            // console.log(selected);
            // console.log(selected.id);
            if(selected != 0) {
                dispatch(updateWorkshopURL(selected.id));
                dispatch(updateBookingDataCity({field: "cid", value: selected.id}));

            }
        }
    
        if(props.name === "workshops") {
            // console.log(`Workshop ${selected}`);
            // console.log(`WorkshopID ${selected.id}`);
            if(selected != 0) {
                dispatch(updateBookingDataWorkshop({field: "wid", value: selected.id}));

            }
        }
        // Fetch data from API endpoint
        fetch(props.url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => setMenuItems(data))
            .catch(error => {
                console.error(error);
            });
        


    }, [props.url, selected, citySelected, dispatch, props.name]);


    

    return (

        <div className="mt-3">
            <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-4 py-2 w-64">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ">
                <span className="block truncate text-gray-500">{selected ? selected.name : props.placeholder}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    />
                </span>
                </Listbox.Button>
                <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {menuItems.map((items) => (
                        <Listbox.Option
                            key={items.name}
                            className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                            }`
                            }
                            value={items}
                        >
                            {({ selected }) => (
                            <>
                                <span
                                    className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {items.name}
                                </span>
                                {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                ) : null}
                            </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
                </Transition>
            </div>
            </Listbox>
      </div>
        
    )
}

export default ListBox;