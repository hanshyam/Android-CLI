import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet, ScrollView, Button,PermissionsAndroid,Linking ,BackHandler} from 'react-native';
import RNFS from 'react-native-fs'; // Importing FileSystem module from React Native
import FileViewer from 'react-native-file-viewer'; // Import FileViewer
import SAF from 'react-native-saf-x';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState(RNFS.ExternalDirectoryPath); // Default to external storage directory
  
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
  const Commands = ["append","cat","cd","clear","date","echo","exit","help","ls","mkdir","neofetch","open","pwd","rm","touch","whoami"];
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
    
    
   
    const [command, ...args] = inputText.trim().split(' ');
    const com = outputText + '\n' + currentDirectory + ":$ " + command;
    setOutputText(com);
    switch (command) {
      case 'pwd':
        setOutputText(prevOutput => prevOutput + `${currentDirectory}\n`);
        break;
      case 'boss':
      case '8055':
        const myName = 'Dinkar Dubey and Ghanshyam Patidar';
        setOutputText(prevOutput => prevOutput + `${myName}\n`);
        break;

      case 'exit':
        BackHandler.exitApp();

        break;
      case 'cd':
        try {
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
              prevOutput => prevOutput + `Directory not found: ${args[0]}\n`,
            );
          }
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
        }
        break;
      case 'whoami':
        try {
          // Get the username of the current device
          const deviceUsername = await DeviceInfo.getDeviceName();
          setOutputText(
            prevOutput => prevOutput + `Device Username: ${deviceUsername}\n`,
          );
        } catch (error) {
          setOutputText(prevOutput => prevOutput + `Error: ${error.message}\n`);
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
        setOutputText(prevOutput => prevOutput + `${formattedDate}\n`);
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
          setOutputText(prevOutput => prevOutput + `${fileContent}\n`);
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
        setOutputText(prevOutput => prevOutput + `${args.join(' ')}\n`);
        break;

      case 'clear':
        setOutputText('');
        break;

      case '--h':
      case '--help':
      case 'help':
        setOutputText( prevOutput => prevOutput +
          'Available Command:\n' +
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
        
      default:
        setOutputText(
          prevOutput => prevOutput +'\n'+command+`: Command not found\n`,
        );
    }
    
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
           
           onChangeText={handleTextInputChange}
          onSubmitEditing={handleTextInputSubmit}
          style={styles.textInput}
        />
         </View>
    </ScrollView>
    <View style={styles.buttonContainer}>
    <Button color={'black'} style={styles.buttons} title='        TAB        ' onPress={TabFunction}/>
    <Button color={'black'} style={styles.buttons} title='          CLR       ' onPress={()=>setInputText('')} />
    <Button color={'black'} style={styles.buttons} title='           /      ' onPress = {()=> setInputText(inputText => inputText+'/')}/>
    <Button color={'black'} style={styles.buttons} title='          -         ' onPress = {()=> setInputText(inputText => inputText+'-')}/>
    </View>
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
    color: '#81a1c1',
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
    color: '#a3be8c',
    fontFamily: 'monospace',
    marginRight: 5,
    fontSize:15,
    fontWeight:'bold',
  },
  textInput: {
    fontSize:18,
    minWidth:250,
    color: '#ebcb8b',
    fontFamily: 'monospace',
    flexWrap:'wrap',
  },
  buttonContainer:{
     paddingTop:10,
     backgroundColor:'black',
     flexDirection:'row',
     justifyContent:'space-between',
    },

});

export default App;