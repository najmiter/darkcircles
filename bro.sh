if [ "$1" == "prod" ]; then
    echo "Minifying and copying the latest files..."
    minify script/koochi-koochi.js > prod/koochi-koochi.js
    minify css/reset.css > prod/reset.css


    echo "Zipping the directory..."
    zip prod.zip prod/*

elif [ "$1" == "buildprod" ]; then
    bash bro.sh
    bash bro.sh prod

elif [ "$1" == "push" ]; then
    if [ "$2" == "" ]; then
        echo "Please give a push message..."
    else
        echo "Adding the commit..."
        git add .

        echo "Commiting with the message '$2'..."
        git commit -m "$2"

        echo "Pushing..."
        git push
    fi

else
    echo Building...
    g++ -std=c++2b dev/merge.cpp && ./a.out && rm ./a.out
fi