#/bin/bash
VOLUME=`hdiutil attach $1 | grep Volumes | awk '{print $3}'`
# APP_NAME=`ls $VOLUME | grep .app`
echo $VOLUME
APP_NAME="${1%.dmg*}.app"
echo $APP_NAME
cp -rf $VOLUME/$APP_NAME /Applications/$APP_NAME
xattr -c /Applications/$APP_NAME

hdiutil detach $VOLUME