import styled from "@emotion/styled";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { speechRecognize } from "./api"

import Recorder from 'js-audio-recorder';

const Sampler = styled(Box)(`
`);


function AudioSampler(){

    const [recordState, setRecordState] = useState(false);

    const [words, setWords] = useState<string[]>([]);


    const [recorder,setRecorder] = useState(new Recorder({
        sampleRate: 16000,    // 采样率
        numChannels: 1,       // 声道数
    }));


    const onstop=(blob) => {

        const reader = new FileReader();
        reader.readAsDataURL(blob);


        reader.onloadend = () => {
            let base64data = reader.result
            base64data=base64data.slice("audio/wav;base64,".length+5);

            console.log(base64data);

            speechRecognize(base64data,blob.size).then((value)=>{

                const data:Array<string> =value.result as Array<string>;

                console.log(data)
                
                setWords((words) => {
                    return words.concat(data);
                })
            })
        }

    }


    return (
        <Sampler sx={{
            alignContent: "center",
            justifyContent: "center",
            display: "flex"
        }}>

            <Grid container>

                <Box height={100}/>

                <Grid item xs={12}>

                    <Button onClick={()=>{
                        setRecordState(true);

                        recorder.start().then(()=>{

                        })


                    }}>开始录音</Button>
                    <Button onClick={()=>{
                        setRecordState(false);

                        recorder.stop();



                        let wavblob=recorder.getWAVBlob()

                        recorder.downloadWAV("test.wav");

                        console.log(wavblob);

                        onstop(wavblob);


                    }}>停止录音</Button>

                </Grid>

                <Box height={100}/>

                <Grid item xs={12}>

                    {/* <audio src="https://www.w3schools.com/html/horse.ogg" controls/> */}

                    {/* <Mic
                    mimeType={'audio/wav'} //Set audio/mp3 to switch to MP3
                    record={recordState}
                    onStop={onstop}
                    strokeColor="#fd971e"
                    backgroundColor="#e7e4df"
                    channelCount={1}
                    bufferSize={16384}      //You can set following bufferSize values: 0, 256, 512, 1024, 2048, 4096, 8192, and 16384. 
                    sampleRate={16000}  //It accepts values only in range: 22050 to 96000
                    /> */}

                </Grid>

                <Grid item xs={12}>

                    <Button>

                        {words.map((word, index) => {
                            return (
                                <Box key={index} sx={{
                                    backgroundColor: "#fd971e",
                                    color: "#e7e4df",
                                    padding: 10,
                                    margin: 10,
                                    borderRadius: 10,
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}>
                                    {word}
                                </Box>
                            )})
                        }
                    </Button>

                </Grid>


            </Grid>
            
            
            

        </Sampler>

    )


}

export default AudioSampler;




// function AudioSampler(){

//     const [recordState, setRecordState] = useState(false);

//     const [words, setWords] = useState<string[]>([]);

//     const options = { numChannels: 1 };
    
//     const { audioURL, isRecording, start, stop } = useRecorder(options);


//     return (
//         <Sampler sx={{
//             alignContent: "center",
//             justifyContent: "center",
//             display: "flex"
//         }}>

//             <Grid container>

//                 <Box height={100}/>

//                 <Grid item xs={12}>

//                     <Button onClick={start} disabled={isRecording}>开始录音</Button>
//                     <Button onClick={stop} disabled={!isRecording}>停止录音</Button>

//                 </Grid>


//                 <Box height={100}/>

//                 <Grid item xs={12}>

//                     <audio src={audioURL} controls type="audio/wav"/>


//                 </Grid>

//                 <Grid item xs={12}>

//                     <Button>

//                         {words.map((word, index) => {
//                             return (
//                                 <Box key={index} sx={{
//                                     backgroundColor: "#fd971e",
//                                     color: "#e7e4df",
//                                     padding: 10,
//                                     margin: 10,
//                                     borderRadius: 10,
//                                     fontSize: 20,
//                                     fontWeight: "bold"
//                                 }}>
//                                     {word}
//                                 </Box>
//                             )})
//                         }
//                     </Button>

//                 </Grid>


//             </Grid>
            
            
            

//         </Sampler>

//     )


// }

// export default AudioSampler;