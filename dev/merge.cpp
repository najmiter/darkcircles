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

    std::fstream output_file{"dev/koochi-koochi.css"};

    for (const auto &file : files)
    {
        std::system(("css-minify -f dev/css/" + file + ".css -o dev/minified-css").c_str());

        std::ifstream minified_css{"dev/minified-css/" + file + ".min.css"};
        if (minified_css.is_open())
            output_file << minified_css.rdbuf();

        minified_css.close();
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