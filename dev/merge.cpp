#include <iostream>
#include <fstream>
#include <array>

auto main() -> int
{
    std::array<std::string, 4> files{
        "dev/css/index.css",
        "dev/css/dashboard.css",
        "dev/css/home.css",
        "dev/css/extras.css",
    };

    std::fstream output_file{"dev/koochi-koochi.css"};

    for (const auto &file : files)
    {
        std::fstream css_file{file};
        if (css_file.is_open())
        {
            output_file << css_file.rdbuf();
            output_file << "\n\n";

            css_file.close();
        }
        else
        {
            std::cout << "Couldn't open this bradha: " << file << std::endl;
        }
    }

    if (!std::system("css-minify -f dev/koochi-koochi.css -o dev/minified-css"))
    {
        std::fstream source_file{"script/koochi-koochi.js"};
        std::fstream logic_file{"script/logic.js"};

        if (source_file.is_open())
        {
            source_file << logic_file.rdbuf();
            logic_file.close();

            source_file << "\nconst koochiKoochi = document.createElement(\"style\");\nkoochiKoochi.innerHTML = `";

            std::fstream minified_css{"dev/minified-css/koochi-koochi.min.css"};
            if (minified_css.is_open())
            {
                source_file << minified_css.rdbuf();
                source_file << "`;\n\ndocument.querySelector(\"head\").appendChild(koochiKoochi);\n";
                minified_css.close();
                source_file.close();
            }
        }
    }
}