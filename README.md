<<<<<<< HEAD
# Android CLI

Android CLI is a terminal emulator app built with React Native that allows users to execute various commands on their Android device's file system.

## Features

- **Command Execution**: Execute various commands such as `cd`, `ls`, `mkdir`, `rmdir`, `append`, `open`, `touch`, `cat`, `rm`, `echo`, `clear`, `date`, `whoami`, `exit`, and `help`.
- **Command History**: View and navigate through the command history.
- **Auto-Complete**: Basic auto-complete functionality suggests commands as users type.
- **File System Access**: Access and manipulate files and directories on the device.
- **Permissions Handling**: Requests necessary permissions (`READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`) to access files.

## Installation

### Download Pre-built Executable

You can download the pre-built executable file from the [releases](https://github.com/thedinkardubey/Android-CLI/releases)  section. After downloading, simply run the executable file on your Android device.

### Build from Source

1. Clone the repository:

   ```bash
   git clone https://github.com/thedinkardubey/Android-CLI.git
   ```
2. Navigate into the project directory:
    
    ```bash
    cd Android-CLI
    ```
    
3. Install dependencies:
    
    ```bash
    npm install react react-native-fs react-native-file-viewer react-native-saf-x react-native-device-info @fortawesome/react-native-fontawesome
    ```
    
4. Run the app:
    ```bash
    npm start
    ```



## Usage

1. Launch the app on your Android device or emulator.
2. Use the terminal interface to input commands.
3. View the output in the terminal.

## Contribution

Thank you for considering contributing to this project! Here's how you can get involved:

- **Star the Project**: If you find this project useful or interesting, please give it a star on GitHub. It helps to show support and appreciation for the project.

- **Send Pull Requests**: Contributions via pull requests are welcome! If you see a bug, an opportunity for improvement, or have a new feature idea, feel free to submit a pull request.

- **Join Discussions**: Participate in discussions by opening or commenting on issues. Share your ideas, ask questions, or give feedback to help improve the project.

We appreciate your support and contributions to make this project better for everyone.

## License

This project is licensed under the MIT License.

## Acknowledgements

- React Native
- React Native FS
- React Native File Viewer
- React Native SAF
- React Native Device Info
- Font Awesome


Thank you for using Android CLI! Happy coding!
=======
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
>>>>>>> 652ec5130aa3eb0a5911e7b29b885f0ee73efa76
