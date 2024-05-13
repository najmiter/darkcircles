#include <iostream>
#include <fstream>
#include <cstdio>
#include <array>

auto main() -> int
{
    std::array<std::string, 4> files{
        "index",
        "extras",
        "dashboard",
        "home",
    };

    // Create directory styles if it doesn't exist
    std::system("mkdir -p styles");
    
    /* Note:
        - The file will be created if it doesn't exist
        - And if it exists, the content will be overwritten
    */
    // Open the output file in write mode
    std::fstream output_file{"dev/koochi-koochi.css", std::ios::out};
    std::fstream output_file2{"styles/koochi-koochi.css", std::ios::out};

    for (const auto &file : files)
    {
        std::system(("css-minify -f dev/css/" + file + ".css -o dev/minified-css").c_str());

        std::ifstream minified_css{"dev/minified-css/" + file + ".min.css"};
        if (minified_css.is_open())
        {
            output_file << minified_css.rdbuf();

            // Reset the position of the streambuf to the beginning
            minified_css.seekg(0);

            output_file2 << minified_css.rdbuf();
        }

        minified_css.close();
    }

    std::ofstream source_file{"script/koochi-koochi.js", std::ios::out};
    std::fstream logic_file{"dev/script/logic.js"};

    if (source_file.is_open())
    {
        source_file << logic_file.rdbuf();
        logic_file.close();

        source_file << "\nconst koochiKoochi = document.createElement(\"style\");\nkoochiKoochi.innerHTML = `";

        // Get the contents of output_file as a string
        std::string output_file_contents;
        {
            std::ifstream ifs("dev/koochi-koochi.css");
            output_file_contents = std::string((std::istreambuf_iterator<char>(ifs)), std::istreambuf_iterator<char>());
        }

        source_file << output_file_contents;

        source_file << "`;\n\ndocument.querySelector(\"head\").appendChild(koochiKoochi);\n";

        source_file.close();

        std::cout << "Built the output file into `script/koochi-koochi.js`" << std::endl;
    }
}