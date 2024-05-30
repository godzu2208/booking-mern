import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";



// create new hotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error);
    }
}

// update hotel
export const updateHotel = async (req, res, next) => {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
    )
    try {
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error);
    }
}

// delete hotel
export const deleteHotel = async (req, res, next) => {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id,
        { $set: req.body },
        { new: true }
    )
    try {
        res.status(200).json(deleteHotel)
    } catch (error) {
        next(error)
    }
}

// get hotel by id
export const getHotel = async (req, res, next) => {
    const getHotel = await Hotel.findById(req.params.id)
    try {
        res.status(200).json(getHotel)
    } catch (error) {
        next(error)
    }
}

// get all hotel
// export const allHotel = async (req, res, next) => {

//     const { min, max, limit, ...others } = req.query;
//     try {
//         const allHotel = await Hotel.find({
//             ...others, cheapestPrice: {
//                 $gt: min | 1, $lt: max | 999
//             }
//         }).limit(parseInt(req.params.limit));
//         res.status(200).json(allHotel)
//     } catch (error) {
//         next(error)
//     }
// }
export const allHotel = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    const minPrice = parseInt(min) || 1; // Giá trị mặc định cho min là 1
    const maxPrice = parseInt(max) || 999; // Giá trị mặc định cho max là 999
    const limitResults = parseInt(limit) || 0; // Giá trị mặc định cho limit là 0 (không giới hạn)

    try {
        const allHotel = await Hotel.find({
            ...others,
            cheapestPrice: {
                $gt: minPrice,
                $lt: maxPrice
            }
        }).limit(limitResults);

        res.status(200).json(allHotel);
    } catch (error) {
        next(error);
    }
}


export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
        const resortCount = await Hotel.countDocuments({ type: "Resort" });
        const villaCount = await Hotel.countDocuments({ type: "Villa" });
        const homestayCount = await Hotel.countDocuments({ type: "Homestay" });

        res.status(200).json([
            { type: "Hotel", count: hotelCount },
            { type: "Apartment", count: apartmentCount },
            { type: "Resort", count: resortCount },
            { type: "Villa", count: villaCount },
            { type: "Homestay", count: homestayCount },
        ])
    } catch (error) {
        next(error)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room);
        }))

        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
