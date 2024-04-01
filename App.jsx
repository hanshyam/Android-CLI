<<<<<<< HEAD
import React, {useState, useEffect,useRef} from 'react';
import {View, TextInput, Text, StyleSheet, ScrollView, Button,PermissionsAndroid,Linking ,BackHandler, Pressable} from 'react-native';
=======
import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet, ScrollView, Button,PermissionsAndroid,Linking ,BackHandler} from 'react-native';
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
import RNFS from 'react-native-fs'; // Importing FileSystem module from React Native
import FileViewer from 'react-native-file-viewer'; // Import FileViewer
import SAF from 'react-native-saf-x';
import DeviceInfo from 'react-native-device-info';
<<<<<<< HEAD
import { faCaretUp,faCaretDown,faCaretLeft,faCaretRight,faGear,faRightLeft,faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
=======
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76

const App = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState(RNFS.ExternalDirectoryPath); // Default to external storage directory
<<<<<<< HEAD

  const [commandHistory, setCommandHistory] = useState([]);
  const [index,setIndex] = useState(-1);

=======
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
  
  // Function to request WRITE_EXTERNAL_STORAGE permission
  const requestStoragePermissions = async () => {
    try {
      const readGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to read files.',
          buttonPositive: 'OK',
        },
      );
      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to write files.',
          buttonPositive: 'OK',
        },
      );
      if (
        readGranted === PermissionsAndroid.RESULTS.GRANTED &&
        writeGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Storage permissions granted');
      } else {
        console.log('Storage permissions denied');
      }
    } catch (error) {
      console.error('Error requesting storage permissions:', error);
    }
  };
  //command storing 
<<<<<<< HEAD
  const Commands = ["append","cat","cd","clear","date","echo","exit","help","history","ls","mkdir","neofetch","open","pwd","rm","touch","whoami"];

=======
  const Commands = ["append","cat","cd","clear","date","echo","exit","help","ls","mkdir","neofetch","open","pwd","rm","touch","whoami"];
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
  // Call the permission request function when the component mounts
  useEffect(() => {
    requestStoragePermissions();
     // Add event listener for back button press
     const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    // Clean up event listener on unmount
    return () => backHandler.remove();
    
  }, []);
  
  const handleBackPress = () => {
    // Prevent default back button behavior
    return true;
  };

  //Auto complete 
  function TabFunction(){
      const match = Commands.find(option => option.startsWith(inputText));
      if(match)
      {
        setInputText(match);
      }
  }
  const handleTextInputChange = text => {
    setInputText(text);
  };

  const handleTextInputSubmit = async () => {
<<<<<<< HEAD
    const [command, ...args] = inputText.trim().split(' ');
    const com = outputText +'\n'+currentDirectory + ":$ " + command;

    setOutputText(com);
    setCommandHistory(prevHistory => [...prevHistory, inputText]);
=======
    
    
   
    const [command, ...args] = inputText.trim().split(' ');
    const com = outputText +'\n'+currentDirectory + ":$ " + command;
    setOutputText(com);
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
    switch (command) {
      case 'pwd':
        setOutputText(prevOutput => prevOutput + `\n${currentDirectory}\n`);
        break;
      case 'boss':
      case '8055':
<<<<<<< HEAD
        const myName = 'Dinkar Dubey';
=======
        const myName = 'Dinkar Dubey and Ghanshyam Patidar';
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
        setOutputText(prevOutput => prevOutput + `\n${myName}\n`);
        break;

      case 'exit':
        BackHandler.exitApp();

        break;
      case 'cd':
        
        try {
          setOutputText(prevOutput=>prevOutput + ` ${args}\n`)
          let newPath;
          if (args.length === 0) {
            newPath = '/';
          } else if (args[0] === '/') {
            newPath = args[0];
          } else if (args[0] === '..') {
            newPath = currentDirectory.split('/').slice(0, -1).join('/') || '/';
          } else if (args[0] === '~') {
            newPath = RNFS.ExternalDirectoryPath; // Navigate to external storage directory (Termux home directory) if argument is '~'
          } 
          else {
            newPath = `${currentDirectory}/${args[0]}`;
          }
          const exists = await RNFS.exists(newPath);
          if (exists) {
            setCurrentDirectory(newPath);
          } else {
            setOutputText(
              prevOutput => prevOutput + `\nDirectory not found: ${args[0]}\n`,
            );
          }
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `\nError: ${error.message}\n`);
        }
        break;
      case 'whoami':
        try {
          // Get the username of the current device
          const deviceUsername = await DeviceInfo.getDeviceName();
          setOutputText(
            prevOutput => prevOutput + `\nDevice Username: ${deviceUsername}\n`,
          );
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `\nError: ${error.message}\n`);
        }
        break;

      case 'date':
        const dateOptions = {
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        };
        const formattedDate = new Date().toLocaleString('en-US', dateOptions);
        setOutputText(prevOutput => prevOutput + `\n${formattedDate}\n`);
        break;

      case 'mkdir':
        try {
          const directoryName = args[0];
          setOutputText(outputText=> outputText +' '+directoryName +'\n')
          if (!directoryName) {
            setOutputText(
              prevOutput => prevOutput + 'Usage: mkdir <directory_name>\n',
            );
            return;
          }
          const newDirectoryPath = `${currentDirectory}/${directoryName}`;
          await RNFS.mkdir(newDirectoryPath);
          setOutputText(
            prevOutput =>
              prevOutput + `Directory created: ${newDirectoryPath}\n`,
          );
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;
      
      case 'rmdir':
        try {
          const directoryName = args[0];
          
          setOutputText(outputText=> outputText +' '+directoryName +'\n')
          if (!directoryName) {
            setOutputText(
              prevOutput => prevOutput + 'Usage: rmdir <directory_name>\n',
            );
            return;
          }
          const directoryPath = `${currentDirectory}/${directoryName}`;
          await RNFS.unlink(directoryPath);
          setOutputText(
            prevOutput => prevOutput + `Directory removed: ${directoryPath}\n`,
          );
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;

      case 'ls':
        setOutputText(outputText=>outputText+'\n');
        try {
          const directoryExists = await RNFS.exists(currentDirectory);
          if (!directoryExists) {
            setOutputText(
              prevOutput =>
                prevOutput + `\nDirectory not found: ${currentDirectory}\n`,
            );
            return;
          }
          const directoryContents = await RNFS.readDir(currentDirectory);
          if (directoryContents.length === 0) {
            setOutputText(prevOutput => prevOutput + '\nDirectory is empty.\n');
          } else {
            const formattedOutput = directoryContents
              .map(item => item.name)
              .join('\n');
            setOutputText(prevOutput => prevOutput + `${formattedOutput}\n`);
          }
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;

      case 'append':
        try {
          const filename = args[0];
          setOutputText(outputText=> outputText +' '+ filename  +'\n')
          const content = args.slice(1).join(' ');
          if (!filename || !content) {
            setOutputText(
              prevOutput => prevOutput + 'Usage: append <filename> <content>\n',
            );
            return;
          }
          const filePath = `${currentDirectory}/${filename}`;
          await RNFS.appendFile(filePath, content, 'utf8');
          setOutputText(
            prevOutput => prevOutput + `Content appended to file ${filePath}\n`,
          );
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;

      case 'open':
        try {
          const fileName = args[0];
          setOutputText(outputText=> outputText +' '+ fileName +'\n')
          if (!fileName) {
            setOutputText(
              prevOutput => prevOutput + 'Usage: open <file_name>\n',
            );
            return;
          }
          const filePath = `${currentDirectory}/${fileName}`;
          // Use FileViewer to open the file
          await FileViewer.open(filePath);
          setOutputText(prevOutput => prevOutput +`File ${fileName} opened\n`);
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;

      case 'touch':
        try {
          const fileName = args[0];
          setOutputText(outputText=> outputText +' '+fileName +'\n')
          if (!fileName) {
            setOutputText(
              prevOutput => prevOutput + 'Usage: touch <file_name>\n',
            );
            return;
          }
          const filePath = `${currentDirectory}/${fileName}`;
          await SAF.writeFile(filePath, '');
          setOutputText(
            prevOutput => prevOutput + `File ${fileName} created\n`,
          );
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;

      case 'cat':
        try {
          const fileName = args[0];
          setOutputText(outputText=> outputText +' '+ fileName +'\n')
          if (!fileName) {
            setOutputText(
              prevOutput => prevOutput + 'Usage: cat <file_name>\n',
            );
            return;
          }
          const filePath = `${currentDirectory}/${fileName}`;
          const fileContent = await RNFS.readFile(filePath);
          setOutputText(prevOutput => prevOutput + `\n${fileContent}\n`);
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;

      case 'rm':
        try {
          const filename = args[0];
          setOutputText(outputText=> outputText + ' '+ filename +'\n')
          if (!filename) {
            setOutputText(prevOutput => prevOutput + 'Usage: rm <filename>\n');
            return;
          }
          const filePath = `${currentDirectory}/${filename}`;
          await RNFS.unlink(filePath);
          setOutputText(
            prevOutput => prevOutput + `File ${filename} removed\n`,
          );
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;


      case 'echo':
        setOutputText(prevOutput => prevOutput + ` ${args.join(' ')}\n`);
<<<<<<< HEAD
        setOutputText(prevOutput => prevOutput + `${args.join(' ')}\n`);
=======
        setOutputText(prevOutput => prevOutput + `\n${args.join(' ')}\n`);
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
        break;

      case 'clear':
        setOutputText('');
        break;

      case '--h':
      case '--help':
      case 'help':
        setOutputText( prevOutput => prevOutput +
          '\nAvailable Command:\n' +
<<<<<<< HEAD
            `  append    Append content to a file\n` +
            `  cat       Display file contents\n` +
            `  cd        Change directory\n` +
            `  clear     Clear the terminal output\n`+
            `  date      Print the current date and time\n` +
            `  echo      Print a message\n` +
            `  exit      Exits the app\n` +
            `  help      Display this help message\n`+
            `  history   Display the command history\n`+
            `  ls        List directory contents\n` +
            `  mkdir     Create a new directory\n` +
            `  open      Open a file\n` +
            `  pwd       Print the current directory\n` +
            `  rm        Remove a file\n` +
            `  touch     Create a new file\n` +
            `  whoami    Print the device username\n`, 
        );
        break;
      
        case 'history':
          let historyOutput = '';
          for (let i = 0; i < commandHistory.length; i++) {
            historyOutput += `\n${commandHistory[i]}`;
          }
          setOutputText(prevOutput => prevOutput + historyOutput + '\n');
          break;

=======
            `  append <filename> <content> Append content to a file\n` +
            `  cat <file_name>             Display file contents\n` +
            `  cd <directory>              Change directory\n` +
            `  clear                       Clear the terminal output\n`+
            `  date                        Print the current date and time\n` +
            `  echo <message>              Print a message\n` +
            `  exit                        Exits the app\n` +
            `  --h, --help, help           Display this help message\n`+
            `  ls                          List directory contents\n` +
            `  mkdir <directory_name>      Create a new directory\n` +
            `  open <file_name>            Open a file\n` +
            `  pwd                         Print the current directory\n` +
            `  rm <filename>               Remove a file\n` +
            `  touch <file_name>           Create a new file\n` +
            `  whoami                      Print the device username\n`, 
        );
        break;
        
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
      default:
        setOutputText(
          prevOutput => prevOutput +'\n'+command+`: Command not found\n`,
        );
<<<<<<< HEAD
        break;
    }
    
    let h = commandHistory.length;
    setIndex(h);

=======
    }
    
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
    setInputText('');
  };

  return (
    <View style={{flex:1}}>

   
    <ScrollView style={styles.container}>
       <Text style={styles.outputText}>{outputText}</Text>
       <Text style={styles.inputPrompt}>{currentDirectory}</Text>
       <View style={styles.inputContainer}>
       <Text style={{color:'#a3be8c',fontWeight:'bold',fontSize:18}}>$: </Text>
       <TextInput
           value={inputText}
<<<<<<< HEAD
=======
           
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
           onChangeText={handleTextInputChange}
          onSubmitEditing={handleTextInputSubmit}
          style={styles.textInput}
        />
<<<<<<< HEAD
      </View>
    </ScrollView>
        <View style={styles.buttonContainer}>
            <View style={styles.buttonInnerContainer}>
                <Button title='~' color="black" onPress={()=>setInputText(inputText+'~')}/>
                <Button title='    /       ' color="black" onPress={() => setInputText(inputText + '/')} titleStyle={{ fontWeight: '999' }} />
                <Pressable onPress={()=>{
                 let h = (index-1)%commandHistory.length;
                 if(h<0)
                 {
                  h = commandHistory.length-1;
                 }
                 setIndex(h)
                 setInputText(commandHistory[h])
                }}> 
                  <FontAwesomeIcon icon={faCaretUp} color='white'/>
                </Pressable>
                <Button title='CLR' color="black" onPress={()=>{
                  setInputText('')
                }}/>
               
            </View>

            <View style={styles.buttonInnerContainer}>
                
              
                <Pressable onPress={TabFunction}>
                  <FontAwesomeIcon icon={faRightLeft} color='white'/>
                </Pressable>
                <Pressable onPress={()=>{
                  console.log("Hello")
                }}>
                  <FontAwesomeIcon icon={faCaretLeft} color="white" />
                </Pressable>
                <Pressable onPress={()=>{
                  let h = (index+1);
                  if(h>commandHistory.length-1){
                    h = 0;
                  }
                  setIndex(h)
                  setInputText(commandHistory[h])
                }}> 
                  <FontAwesomeIcon icon={faCaretDown} color='white'/>
                </Pressable>
                <FontAwesomeIcon icon={faCaretRight} color='white'/>
                
            </View>
        </View>
=======
         </View>
    </ScrollView>
    <View style={styles.buttonContainer}>
    <Button color={'black'} style={styles.buttons} title='        TAB        ' onPress={TabFunction}/>
    <Button color={'black'} style={styles.buttons} title='          CLR       ' onPress={()=>setInputText('')} />
    <Button color={'black'} style={styles.buttons} title='           /      ' onPress = {()=> setInputText(inputText => inputText+'/')}/>
    <Button color={'black'} style={styles.buttons} title='          -         ' onPress = {()=> setInputText(inputText => inputText+'-')}/>
    </View>
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: 'black',
    fontFamily:'monospace',
    padding: 10,
    paddingBottom:30,
  },
  outputContainer: {
    backgroundColor:'red',
    flex: 1,
  },
  outputText: {
<<<<<<< HEAD
    color: '#81A1C1',
=======
    color: '#4682B4',
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
    fontFamily: 'monospace',
    fontSize:15,
  },
  inputContainer: {
    flex:1,
     flexDirection:'row',
    flexWrap:'wrap',
     alignItems: 'center',
     marginBottom:30,
  },
  inputPrompt: {
<<<<<<< HEAD
    color: '#A3BE86',
=======
    color: '#90EE90',
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
    fontFamily: 'monospace',
    marginRight: 5,
    fontSize:15,
    fontWeight:'bold',
  },
  textInput: {
    fontSize:18,
    minWidth:250,
<<<<<<< HEAD
    color: '#EBCB8B',
=======
    color: '#FFD700',
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
    fontFamily: 'monospace',
    flexWrap:'wrap',
  },
  buttonContainer:{
<<<<<<< HEAD
   backgroundColor:'black',
   padding:10,
  },
  buttonInnerContainer:{
     paddingTop:10,
     backgroundColor:'black',
     fontSize:20,
     flexDirection:'row',
     alignItems:'center',
=======
     paddingTop:10,
     backgroundColor:'black',
     flexDirection:'row',
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
     justifyContent:'space-between',
    },
});

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
