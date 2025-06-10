import logo from './images/logo.png'
import logoText from './images/logoText.png'
import transparentcar from './images/transparentcar.png'
import docPic from './images/gettyimages-1168408797-612x612.jpg'
import servicePic from './images/gettyimages-1235245955-612x612.jpg'
import trainingPic from './images/images (19).jpeg'
import truck from './images/gettyimages-1235246163-612x612.jpg'
import trailer from './images/trailer.jpg'
import forklift from './images/forklift.jpg'
import truckImg from './images/transTruck.png'
import carImg from './images/transCar.png'


const Logo  = logo;
const LogoText  = logoText;


const  db = 'https://saculietdrivingschool.org/saculietAPI'
// const  db = 'http://localhost:80/saculietAPI'



const CarouselItems = [
    // Add your carousel items here
    {   
        // title: 'Embark on a journey to professional driving excellence with Saculiet Driving School',
        title: ['Learn to Drive Professionally with',' Saculiet Driving School'],
        img: transparentcar,
        p: 'Our comprehensive lessons are tailored to elevate your driving skills, ensuring you become a confident, skilled and reasonable driver',
    },
    { 
        img: servicePic,
        title: ['We Teach The Art Of Driving And Importance Of Safe Driving'],
        p: "We don't just teach driving, we impart the art of safe and skilled driving. Join us in prioritizing safety and mastering the road",
    },
    {  
        img: trailer,
        title: ['Learn and Earn with your driving skill'],
        p: 'Explore and job oppurtunities as you elevate your driving skill',
    },
    { 
        img: docPic,
        title: ['Licensing and Vehicle documentation made easy'],
        p: "We simplify the path to abtaining your license and essential vehicle documents",
    },
]

  const AfterHeroContent = [
    {
        img: 'person-badge-fill',
        title: 'Professional Driving',
        content: 'We are dedicated to shaping drivers with a strong sense of responsibility, courtesy, and expertise. Learn with us, and embody the values of professionalism on the road.'
    },
    {
        img: 'shield-fill-plus',
        title: 'Safe Driving',
        content: 'We instill a deep commitment to safe driving practices. Join us, where every lesson is a step towards a safer journey'
    },
    {
        img: 'lightning-fill',
        title: 'Empowerment',
        content: 'Our commitment encompasses confidence-building and independence,  a profound understanding of responsible road behavior.'
    }
]

const NavInfo = [
    {
        title: 'Home',
        icon: 'house',
        link: ''
    },
    {
        title: 'About',
        icon: 'person',
        link: 'about'
    },
    {
        title: 'Courses',
        icon: 'book',
        link: 'courses'
    },
    {
        title: 'Gallery',
        icon: 'image',
        link: 'gallery'
    },
    {
        title: 'Contact',
        icon: 'telephone',
        link: 'contact'
    },
    {
        title: 'Certificate Verification',
        icon: 'award',
        link: 'certificate_verification'
    },
]

const SocialMediaInfo = [
    {
        title: 'Address',
        icon: 'geo-fill',
        text: 'NO 16 & 17C, Suite 128 Abiodun, Jagun Street, Jeho Shamah Plaza, Ogba, Ikeja, Lagos',
        link: ''
    },
    {   
        title: 'Customer Service',
        icon: 'telephone-fill',
        link: 'tel:+2349065823571',
        text: '+2349065823571'
    },
    {
        title: 'Whatsapp',
        icon: 'whatsapp',
        link: 'https://api.whatsapp.com/send?phone=2349163268225',
        text: '+2349163268225'
    },
    {  
        title: 'Business Development',
        icon: 'telephone-fill',
        link: 'tel:+2349163268225',
        text: '+2349163268225'
    },
]
const Emails = [
    {
        title: 'Customer Service',
        icon: 'envelope-fill',
        link: 'mailto:customerservice@saculietdrivingschool.org',
        text: 'customerservice@saculietdrivingschool.org'
    },
    {
        title: 'Business Development',
        icon: 'envelope-fill',
        link: 'mailto:businessdevelopment@saculietdrivingschool.org',
        text: 'businessdevelopment@saculietdrivingschool.org'
    },
    {
        title: 'Transport and Logistics',
        icon: 'envelope-fill',
        link: 'mailto:transportandlogistics@saculietdrivingschool.org',
        text: 'transportandlogistics@saculietdrivingschool.org'
    },
    {
        title: 'Training Department',
        icon: 'envelope-fill',
        link: 'mailto:trainingdepartment@saculietdrivingschool.org',
        text: 'trainingdepartment@saculietdrivingschool.org'
    },
    {
        title: 'Elizabeth Funmilayo',
        icon: 'envelope-fill',
        link: 'mailto:elizabethfunmilayo@saculietdrivingschool.org',
        text: 'elizabethfunmilayo@saculietdrivingschool.org'
    },
    {
        title: 'Mr Onido',
        icon: 'envelope-fill',
        link: 'mailto:onido@saculietdrivingschool.org',
        text: 'onido@saculietdrivingschool.org'
    },
]

const ServicesRendered = [
    {
        section: 'Trainings',
        img: trainingPic,
        services: [
            {
                title: 'Car Driving',
                price: ''
            },
            {
                title: 'Truck Driving',
                price: ''
            },
            {
                title: 'Trailer Driving',
                price: ''
            },
            {
                title: 'Forklifting Operating',
                price: ''
            },
            {
                title: 'Dispatch Riders Training and Cerification',
                price: ''
            },
            
        ]
    },
    {
        section: 'Services',
        img: servicePic,
        services: [
            {
                title: 'Truck Testing',
                price: ''
            },
            {
                title: 'Truck Driving',
                price: ''
            },
            {
                title: 'Forklifting Operating',
                price: ''
            },
            {
                title: 'Vehicle Buying and Selling',
                price: ''
            },
            {
                title: 'Consultancy and General Services',
                price: ''
            },
            {
                title: "Drivers Recruitment and Outsourcing",
                price: ''
            },
            {
                title: 'Training, Re-training and Assessment Services',
                price: ''
            },
        ]
    },
        {
            section: 'Documentations',
            img: docPic,
            services: [
                {
                    title: "International Driver's License",
                    price: ''
                },
                {
                    title: 'Vehicle Registration Processing',
                    price: ''
                },
                {
                    title: 'LASDRI Processing and Renewals',
                    price: ''
                },
                {
                    title: 'Driving License Processing and Renewal',
                    price: ''
                },
                {
                    title: 'Vehicle Documentation, Processing and Renewals',
                    price: ''
                },
            ]
        }
]

const classes = [
    {
        title: 'Adult Lessons',
        price :''
    },
    {
        title: 'Private Lessons',
        price :''
    },
    {
        title: 'Teens Lessons',
        price :''
    },
]




const Nos = [
    {
        title: 'Trained Students',
        no: '5000',
        interval: 50,
        icon: 'people'
    },
    {
        title: 'Training Sessions',
        no: '200',
        interval: 2,
        icon: 'clock-history'
    },
    {
        title: 'Tutors',
        no: '15',
        interval: 1,
        icon: 'person'
    },
    {
        title: 'Satisfied Clients',
        no: '200',
        interval: 2,
        icon: 'person-check'
    },
    // {
    //     title: 'Trained Students',
    //     no: '30',
    //     icon: ''
    // },
]

const ReviewsData = [
    {
        name: 'Precious Paul',
        rating: '5',
        review: 'This driving school offers classes that are just the right length, with plenty of time behind the wheel and flexible scheduling options. I highly recommend this school to anyone looking for a convinient and affordable way to learn'
    },
    {
        name: 'Emmanuel Akanji',
        rating: '4',
        review: 'Saculiet Driving School and Logistics is a place to go for all automobile services ranging Driving training (for diverse automobiles) and other automoblie related services. They are know for excellence and commitment to serving you the best always'
    },
    {
        name: 'Udomisoh Smart',
        rating: '5',
        review: 'If you are looking for a good driving academy, Saculiet is a place to be. I really enjoyed my time with the school. It is a place to get value for your money'
    },
    {
        name: 'Bright Awoms',
        rating: '5',
        review: 'With what I have seen here and the knowledge I have acquired here, Saculiet Driving School is one of the few best Driving Schools in the country, Nigeria'
    },
]

export const CoursesList = [
    {
        title: "Car Driving",
        outline: [
            "Classroom Training",
            "Driver Orientation And Preparation",
            "The Art Of Driving",
            "Safe Driving And Road Traffic Laws",
            "Sharing The Road With Other Users/Parking",
            "Basic Vehicle Maintenance",
            "Road Signs And Markings",
            "Basic Vehicle Mechanism",
            "Road Traffic Crashes (RTC’s) Causes, Effects And Prevention",
            "Basic First Aid And Cardiopulmonary Resuscitation (CPR)",
            "Tyre And Safety",
            "Licensing Of Vehicles And Drivers "
        ],
        desc: ["Theory classes and Practical classes are during the week, and are flexibly scheduled"],
        img: carImg,
        categories: [
            {
                title: "Manual Car Driving",
                name: "manual",
                cost: "95,000",
                duration: "1 Month",
            },
            {
                title: "Automatic Car Driving",
                name: "automatic",
                cost: "80,000",
                duration: "1 Month",
            }
        ]
    },
    {
        title: "Truck / Trailer Driving",
        outline: [
            "Understanding Truck And Functions",
            "Blind Sports",
            "Sharing The Road With Others Users",
            "Road Signs And Markings",
            "Pre-Trip Inspection",
            "Defensive Driving",
            "Air Break Inspection",
            "Load Securing",
            "Truck Device (Techograph)",
            "Truck Route Planning",
            "Truck Tyres",
            "Truck Maintainance",
            "Safety Precaution",
            "Classes Of Drivers License",
            "Speed Limits "  
        ],
        img: truckImg,
        categories: [
            {
                title: "Truck Driving (10 tons)",
                name: "truck",
                cost: "330,000",
                duration: "1 Month",
                desc: ["Theory classes are on Thursdays and Pratical Classes are on Saturday and Sundays"]
                
            },
            {
                title: "Trailer Driving",
                name: "trailer",
                cost: "850,000",
                duration: "10 weeks",
                desc: ["1 month of undergoing Truck Training before proceeding to Trailer Training", "Theory classes are on Thursdays and Pratical Classes are on Saturday and Sundays for Truck training but only Sundays for Trailer Training"]
            }
        ]
    },
    {   title: "Forklift Operation",
        outline: [
            "Earth Moving Vehicles",
            "Categories Of Earth Moving Vehicles",
            "Forklift",
            "Different Type Of Forklift",
            "Forklift Basic Control",
            "Forklift Parts",
            "Who Is A Forklift Operator",
            "Operating Forklift",
            "Safe Operation Of Forklift",
            "Forklift Maintenance",
            "Operators Responsibility",
            "Needs Of Forklift Operators",
            "Safety Rules And Tips",
            "Blind Spot Of Forklift And Loading Capacity"    
        ],
        desc: ["Theory classes are on Mondays and Pratical Classes are on Wednesday and Fridays"],
        img: forklift,
        categories: [
            {
                title: "Forklift Operation",
                cost: "200,000",
                duration: "6 weeks",
                name: "forklift",
            }
        ]
    }
]


export const NarrowedCourses = {
    manual: {
        title: "Manual Car Driving",
        price: "95,000",
        duration: "1 Month",
        day: "Monday",
        interval: 4
    },
    automatic: {
        title: "Automatic Car Driving",
        price: "80,000",
        duration: "1 Month",
        day: "Monday",
        interval: 4
    },
    truck: {
        title: "Truck Driving (10 tons)",
        price: "330,000",
        duration: "1 Month",
        day: "Thursday",
        interval: 4
    },
    trailer: {
        title: "Trailer Driving",
        price: "850,000",
        duration: "10 Weeks",
        day: "Thursday",
        interval: 10
    },
    forklift: {
        title: "Forklift Operation",
        price: "200,000",
        duration: "6 Weeks",
        day: "Monday",
        interval: 6
    }
}


export { Logo, LogoText, NavInfo, SocialMediaInfo, AfterHeroContent, CarouselItems, ServicesRendered, Nos, classes, ReviewsData, db, Emails }