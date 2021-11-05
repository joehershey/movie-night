To run:

1) sudo npm i -g expo-cli
--installs expo

2a)cd to directory*
2b*) npm start
--should start expo server

3a)install Expo Go app on phone
3b*) Scan qr code from camera that is in bottom left of the expo server website
--App should start to run when you press the link from qr code in your camera app (not sure about Android)

After expo and expo go are installed, all you need to do is steps 2b & 3b to get it running

If Expo Go app gives an alert saying "Cannot connect to the Metro server" (happens after leaving the app it seems)

1) Shake phone
2) Press reload
*If still not working* 3) Run "npm start" again and scan new QR code
