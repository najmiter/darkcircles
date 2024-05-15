if [ "$1" == "prod" ]; then
    echo "Copying the latest script..."
    cp -f script/koochi-koochi.js prod/koochi-koochi.js

    echo "Zipping the directory..."
    zip prod.zip prod/*

elif [ "$1" == "buildprod" ]; then
    bash build.sh
    bash build.sh prod

elif [ "$1" == "push" ] && [ "$2" != "" ]; then
    echo "Adding the commit..."
    git add .

    echo "Commiting with the message '$2'..."
    git commit -m "$2"

    echo "Pushing..."
    git push

else
    echo Building...
    g++ -std=c++2b dev/merge.cpp && ./a.out && rm ./a.out
fi