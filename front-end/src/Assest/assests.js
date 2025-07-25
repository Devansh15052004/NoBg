import logo from './logo.jpg';
import video_banner from './home-page-banner.mp4';
import people from './people.png';
import people_org from './people-org.png';
import dollar from './dollar.png';
export const assets = {
  logo,
  video_banner,
  people,
  people_org,
  dollar,
};

export const steps = [
  {
    step: "Step 1",
    title: "Select an image",
    description: `First, choose the image you want to remove background from by clicking on "Start from a photo".\nYour image format can be PNG or JPG.\nWe support all image dimensions.`,
  },
  {
    step: "Step 2",
    title: "Let magic remove the background",
    description: `Our tool automatically removes the background from your image. Next, you can choose a background color.\nOur most popular options are white and transparent background, but you can pick any color you like.`,
  },
  {
    step: "Step 3",
    title: "Download your image",
    description: `After selecting a new background color, download your photo and you're done!\nYou can also save your picture in the photoroom App by creating an account.`,
  },
];
export const categories=["People","Products","Animals","Cars","Graphics"];

export const plans=[
  {
    id:"Basic",
    name:"Basic Package",
    price:499,
    credits:"100 credits",
    description:"Best for presonal use",
    popular:false
  },
  {
    id:"Premium",
    name:"Premium Package",
    price:899,
    credits:"250 credits",
    description:"Best for Business use",
    popular:true
  },
  {
    id:"Ultimate",
    name:"Ultimate Package",
    price:1499,
    credits:"1000 credits",
    description:"Best for enterprise use",
    popular:false
  },
];


export const testimonials=[
  {
    id:1,
    quote:"We are impresses by the AI and think it's the best choice on the market.",
    author:"Anthony Walker",
    handle:"@_webarchitect_"
  },
  {
    id:2,
    quote:"remove.bg is leaps and bounds ahead of the competition. A  thousand times better. It simplifed the whole process.",
    author:"Sarag Johnson",
    handle:"@techlead_sarah"
  },
  {
    id:3,
    quote:"We are impressed by its ability to account for pesky, feathery hair without making an image look jagged and amateurish.",
    author:"Michael Chen",
    handle:"@coding_newbie"
  },
];

export const footer_constant=[
  {
    url:"https://facebook.com",
    logo:"https:/img.icons8.com/fluent/30/000000/facebook-new.png"
  },
  {
    url:"https://linkedin.com",
    logo:"https:/img.icons8.com/fluent/30/000000/linkedin-2.png"
  },
  {
    url:"https://instagram.com",
    logo:"https:/img.icons8.com/fluent/30/000000/instagram-new.png"
  },
  {
    url:"https://twitter.com",
    logo:"https:/img.icons8.com/fluent/30/000000/twitter.png"
  }
];