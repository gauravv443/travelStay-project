const Listing=require("../models/listing");
const User=require("../models/user");
const geocode = require("../utils/geocode");
module.exports.index = async (req, res) => {

    const allListings = await Listing.find({});

    let wishlist = [];

    if(req.user){

        const user = await User.findById(req.user._id);

        wishlist = user.wishlist.map(id => id.toString());

    }

    res.render("listings/index.ejs",{
        allListings,
        wishlist
    });

};

module.exports.newListing=async (req,res,next)=>{
   let url=req.file.path;
   let filename=req.file.filename;
   const coords = await geocode(req.body.listing.location);
   

   const newListing=new Listing(req.body.listing);

  newListing.geometry = {
    type: "Point",
    coordinates: [
      Number(coords.lon),
      Number(coords.lat)
    ]
  };
   newListing.owner=req.user._id;
   newListing.image={url,filename};
   await newListing.save();
   req.flash("success","New Listing Created!");
   res.redirect("/listings")
};

module.exports.editFormRender=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
     if(!listing){
       req.flash("error","Listing you are looking for does not exist!");
       res.redirect("/listings");
    }
        let originalImage=listing.image.url;
        originalImage=originalImage.replace("/upload","/upload/w_200");
        res.render("listings/edit.ejs",{listing,originalImage});
    
    
};


module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const show=await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    if(!show){
       req.flash("error","Listing you are looking for does not exist!");
       res.redirect("/listings");
    }else{
      res.render("listings/show.ejs",{show});
    }
   
    
};


module.exports.listingUpdate=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
       let url=req.file.path;
       let filename=req.file.filename;
       listing.image={url,filename};
       await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.listingDeleted=async (req,res)=>{
    let {id}=req.params;
    const deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings"); 
};


module.exports.renderNewForm=(req,res)=>{
 res.render("listings/new.ejs");
};

module.exports.Search=async(req,res)=>{
    let searchText=req.query.query;
    let allListings=await Listing.find({$or:[{location:{$regex:searchText,$options:"i"}},{description:{$regex:searchText,$options:"i"}},{title:{$regex:searchText,$options:"i"}}]});
    res.render("listings/index.ejs",{allListings});
};

// module.exports.wishlist=async (req, res) => {

//     let { id } = req.params;

//     let user = await User.findById(req.user._id);

//     if(!user.wishlist.includes(id)){
//         user.wishlist.push(id);
//         await user.save();
//     }
//     req.flash("success","Listing saved");
//     res.redirect(`/listings/${id}`);
// };

module.exports.wishlist = async (req, res) => {

    const { id } = req.params;

    const user = await User.findById(req.user._id);

    let saved = false;

    if(user.wishlist.includes(id)){

        user.wishlist.pull(id);

    }else{

        user.wishlist.push(id);

        saved = true;

    }

    await user.save();

    res.json({
        success:true,
        saved:saved
    });

};

module.exports.renderwishlist=async (req, res) => {

    let user = await User.findById(req.user._id)
        .populate("wishlist");

    res.render("listings/wishlist.ejs", {
        wishlist: user.wishlist
    });
};

module.exports.removeWishlist = async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            wishlist: id
        }
    });

    req.flash("success", "Removed from wishlist!");

    res.redirect("/listings/wishlist");
};

module.exports.filterByCategory = async (req, res) => {

    const { category } = req.params;

    const allListings = await Listing.find({
        category: category
    });

    res.render("listings/index.ejs", {
        allListings
    });

};