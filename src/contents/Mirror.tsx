import { styled } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";


const images = [
    "https://data.whicdn.com/images/251238216/original.gif",
    "https://i.pinimg.com/originals/3d/22/45/3d224511a5e13317e46e37bee1d249dd.gif",
    "https://i.pinimg.com/originals/b0/10/e9/b010e954f94acbd034917b2d6931bd79.gif",
    "https://64.media.tumblr.com/5f4c0252b15dda55028536c5a8923c7d/b691a90722d7bbb5-c8/s500x750/34aac55dfd7302e41fec400ba9636edeadb1890a.gif",
    "https://64.media.tumblr.com/746e848c8b0cf90bc7938599421e6b4e/tumblr_pbhfk0rEth1txe8seo1_500.gif",
    "https://media2.giphy.com/media/Wm9XlKG2xIMiVcH4CP/giphy.gif"
];



const Mirror=styled(Box)(({theme})=>(`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.scene {
	width: 100%;
	position: relative;
	height: 100%;
	//background: #daacae;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	perspective: 500px;
}

.item {
	position: absolute;
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: left top;
	pointer-events: none;
}

#plant {
	background-image: url(https://ouch-cdn2.icons8.com/CZaKIJ63jjlgvDcdjcjUnlfpffRScIiXzi4HMrpLAsM/rs:fit:728:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjM2/L2RkMzRmMzVhLWVk/YmMtNDRlZi1hOGNm/LTZlZjJlMTBlMzU2/My5wbmc.png);
	width: 500px;
	height: 620px;
	bottom: -26px;
	margin-right: 400px;
}

#plant-2 {
	background-image: url(https://ouch-cdn2.icons8.com/E47kcuNp_3-4IrDybcMwr6zMELcbhBQLKzImj-ot8E4/rs:fit:855:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMzE5/LzljNjEwNjJhLTk4/YmMtNDViMS1iZGVm/LTMwNzVjMTMxYjQ1/OC5wbmc.png);
	width: 300px;
	height: 320px;
	bottom: -50px;
	margin-right: 300px;
}

#plant-3 {
	background-image: url(https://ouch-cdn2.icons8.com/oo4nsgAN74wL_FDHCUIwOdB3rPN6SGavRjxiz-1ds4s/rs:fit:1201:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTk0/LzVlMGQ1NjhlLWNh/NTEtNGJlNC1iNWEz/LTQyYTcwNDlmZGMy/My5wbmc.png);
	width: 160px;
	height: 125px;
	bottom: -50px;
	margin-left: 380px;
}

#books {
	background-image: url(https://ouch-cdn2.icons8.com/AUAdQ5eK8APXniP0hwVusHWtZRMk9FA2Jm9FSza1StY/rs:fit:850:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNy9j/NTcxMWIzNC1mMTYy/LTQ3MTAtOGExYi1l/YzY1M2FlN2IwYWYu/cG5n.png);
	width: 200px;
	height: 220px;
	bottom: -40px;
	margin-left: 620px;
}

#apple {
	background-image: url(https://ouch-cdn2.icons8.com/-O2SifADepTOg7bXJ5whR6wB0iMfq5y7vrIaJdmKp20/rs:fit:851:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvODYy/L2M3MjBkM2Q3LWMw/NTgtNDJkOC04ZGEw/LTc2MTM1N2YwMmNh/OC5wbmc.png);
	width: 64px;
	height: 70px;
	top: -64px;
	left: 30px;
}


#mirror {
	width: 350px;
	height: 580px;
	position: relative;
	box-shadow: 16px 2px 10px rgba(0, 0, 0, 0.4);
	perspective: 500px;
	border-top-left-radius: 300px;
	border-top-right-radius: 300px;
	transform-origin: top center;
	transform: rotateX(3deg);
	cursor: pointer;
}

#mirror-content {
	position: absolute;
	content: "";
	width: 100%;
	height: 100%;
	background-position: center center;
	background-size: auto 100%;
	background-repeat: no-repeat;
	box-shadow: inset 6px 3px 10px rgba(0, 0, 0, 0.4);
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
	border: 6px solid #e7e4df;
	z-index: 0;
	display: flex;
	justify-content: center;
}

#mirror-content:before {
	position: absolute;
	content: "「 ｃｌｉｃｋ ｍｅ 」";
	font-family: sans-serif;
	text-transform: uppercase;
	color: #e7e4df;
	font-weight: bold;
	letter-spacing: 4px;
	font-size: 10px;
	text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
	text-align: center;
	bottom: 0;
	z-index: 100;
	opacity: 0.6;
	transition: all 0.5s ease;
	padding: 18px 0;
}

#mirror:hover #mirror-content:before {
	opacity: 0.4;
	transform: translateY(4px);
}
`));




function View({image}:{image:string|null}){

    const [current, setCurrent] = useState(0);

    

    return (
        <Mirror>

            <Box className="scene">
                <Box id="plant" className="item"></Box>
                <Box id="mirror">
                    <Box id="mirror-content" onClick={
                        () => {

                            setCurrent(current + 1);
                        }
                    } sx={{
                        backgroundImage: image? image:`url(${images[current % images.length]})`
                    }}></Box>
                </Box>
                <Box id="plant-2" className="item"></Box>
                <Box id="books" className="item">
                    <Box id="apple" className="item"></Box>
                </Box>
                <Box id="plant-3" className="item"></Box>
            </Box>

        </Mirror>
        

    )

}

export default View