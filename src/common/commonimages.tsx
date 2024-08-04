// apps

import calender from '../assets/images/apps/calender.png';
import figma from '../assets/images/apps/figma.png';
import google from '../assets/images/apps/google.png';
import googledocs from '../assets/images/apps/google-docs.png';
import googlesheets from '../assets/images/apps/google-sheets.png';
import microsoftpowerpoint from '../assets/images/apps/microsoft-powerpoint.png';
import microsoftword from '../assets/images/apps/microsoft-word.png';
import sketch from '../assets/images/apps/sketch.png';
import translate from '../assets/images/apps/translate.png';

//Brandlogos

import desktopdark from '../assets/images/brand-logos/desktop-dark.png';
import desktoplogo from '../assets/images/brand-logos/desktop-logo.jpg';
import desktopwhite from '../assets/images/brand-logos/desktop-white.png';
import favicon from '../assets/images/brand-logos/favicon.ico';
import toggledark from '../assets/images/brand-logos/toggle-dark.png';
import togglelogo from '../assets/images/brand-logos/toggle-logo.png';
import togglewhite from '../assets/images/brand-logos/toggle-white.png';

//ecommerce

import ecommerce1 from '../assets/images/ecommerce/1.jpg';
import ecommerce4 from '../assets/images/ecommerce/4.jpg';
import ecommerce6 from '../assets/images/ecommerce/6.jpg';
import ecommerce12 from '../assets/images/ecommerce/12.jpg';
import ecommerce16 from '../assets/images/ecommerce/16.jpg';
import ecommerce19 from '../assets/images/ecommerce/19.jpg';


//faces

import face1 from '../assets/images/faces/1.jpg';
import face2 from '../assets/images/faces/2.jpg';
import face4 from '../assets/images/faces/4.jpg';
import face5 from '../assets/images/faces/5.jpg';
import face6 from '../assets/images/faces/6.jpg';
import face7 from '../assets/images/faces/7.jpg';
import face8 from '../assets/images/faces/8.jpg';
import face9 from '../assets/images/faces/9.jpg';
import face10 from '../assets/images/faces/10.jpg';
import face11 from '../assets/images/faces/11.jpg';
import face12 from '../assets/images/faces/12.jpg';
import face13 from '../assets/images/faces/13.jpg';
import face14 from '../assets/images/faces/14.jpg';
import face15 from '../assets/images/faces/15.jpg';


//Flag

import argentina from '../assets/images/flags/argentina_flag.jpg';
import canada from '../assets/images/flags/canada_flag.jpg';
import china from '../assets/images/flags/china_flag.jpg';
import french from '../assets/images/flags/french_flag.jpg';
import germany from '../assets/images/flags/germany_flag.jpg';
import india from '../assets/images/flags/india_flag.jpg';
import italy from '../assets/images/flags/italy_flag.jpg';
import mexico from '../assets/images/flags/mexico_flag.jpg';
import russia from '../assets/images/flags/russia_flag.jpg';
import singapore from '../assets/images/flags/singapore_flag.jpg';
import spain from '../assets/images/flags/spain_flag.jpg';
import uae from '../assets/images/flags/uae_flag.jpg';
import us from '../assets/images/flags/us_flag.jpg';



//svg icons

import svg1 from '../assets/images/svgicons/accountant.svg';
import svg2 from '../assets/images/svgicons/banner-img.svg';
import svg7 from '../assets/images/svgicons/chrome.svg';
import svg8 from '../assets/images/svgicons/edge.svg';
import svg10 from '../assets/images/svgicons/firefox.svg';
import svg20 from '../assets/images/svgicons/opera.svg';
import svg28 from '../assets/images/svgicons/safari.svg';



export const imagesData = (idx: any) => {

  const images: any = {

    calender, figma, google, googledocs, googlesheets, microsoftpowerpoint, microsoftword, sketch, translate,

    desktopdark, desktoplogo, desktopwhite, favicon, toggledark, togglelogo, togglewhite,

    ecommerce1, ecommerce4, ecommerce6,
    ecommerce12, ecommerce16, ecommerce19,



    face1, face2, face4, face5, face6, face7, face8, face9, face10,
    face11, face12, face13, face14, face15,

    argentina, canada, china, french, germany, india, italy, mexico, russia, singapore, spain, uae, us,



    svg1, svg2, svg7, svg8, svg10,
    svg20,
    svg28,

  };
  return images[idx];
};
