#include <filesystem>
#include <iostream>
#include <fstream>

#define in :
namespace fs = std::filesystem;

auto main() -> int
{
    if (fs::exists("dev/"))
    {
        auto css_directory = fs::directory_iterator("dev/css/");
        for (auto css_file in css_directory)
        {
            auto source = css_file.path().string();
            auto destination = "dev/minified-css/" + css_file.path().filename().string();

            std::cout << "Minifying `" << source << "` into `" << destination << '`' << std::endl;
            std::system(("minify " + source + " > " + destination).c_str());
        }
    }
    else
    {
        std::cerr << "Couldn't find the `dev` directory." << std::endl;
        return -1;
    }

    if (fs::exists("dev/minified-css"))
    {
        std::fstream output_file{"dev/koochi-koochi.css"};

        auto minified_css_directory = fs::directory_iterator("dev/minified-css/");
        for (auto css_file in minified_css_directory)
        {
            std::ifstream minified_css{css_file.path()};
            if (minified_css.is_open())
            {
                output_file << minified_css.rdbuf();
                minified_css.close();
            }
        }

        std::ofstream source_file{"script/koochi-koochi.js"};
        std::fstream logic_file{"script/logic.js"};

        if (source_file.is_open())
        {
            source_file << logic_file.rdbuf();
            logic_file.close();

            source_file << "\nconst koochiKoochi = document.createElement(\"style\");\nkoochiKoochi.innerHTML = `";

            output_file.seekg(0);
            source_file << output_file.rdbuf();
            source_file << "`;\n\ndocument.querySelector(\"head\").appendChild(koochiKoochi);\n";

            source_file.close();

            std::cout << "Built the output file into `script/koochi-koochi.js`" << std::endl;
        }
    }
}
