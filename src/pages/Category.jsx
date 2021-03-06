import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get reference
                const listingsRef = collection(db, 'listings')

                // Create a query
                const q = query(
                listingsRef,
                where('type', '==', params.categoryName),
                orderBy('timestamp', 'desc'),
                limit(10)
                )

                // Execute query
                const querySnap = await getDocs(q)

                const lastVisable = querySnap.docs[querySnap.docs.length-1];
                setLastFetchedListing(lastVisable);

                let listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings);
                setLoading(false);

            } catch (error) {
                toast.error('Sorry we could not load the listings at the moment.')
            }
        }
        fetchListings();
    }, [params.categoryName])


    // Pagination / Load more
    const onFetchMoreListings = async () => {
        try {
            // Get reference
            const listingsRef = collection(db, 'listings')

            // Create a query
            const q = query(
            listingsRef,
            where('type', '==', params.categoryName),
            orderBy('timestamp', 'desc'),
            startAfter(lastFetchedListing),
            limit(10)
            )

            // Execute query
            const querySnap = await getDocs(q)

            const lastVisable = querySnap.docs[querySnap.docs.length-1];
            setLastFetchedListing(lastVisable);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings((prevState) => [...prevState, ...listings]);
            setLoading(false);

        } catch (error) {
            toast.error('Sorry we could not load the listings at the moment.')
        }
    }

    return (
        <div className="category">
            <header>
                <p className="pageHeader">{params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}</p>
            </header>

            {loading ? <Spinner /> : listings && listings.length > 0 ? 
            (
                <Fragment>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                            ))}
                        </ul>
                    </main>

                    {lastFetchedListing && (
                        <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
                    )}
                </Fragment>) 
            : <p>There are no listings for {params.categoryName} at the moment.</p>}
        </div>
    )
}

export default Category
