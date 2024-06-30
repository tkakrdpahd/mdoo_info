/*
    table name (html page name)
    idx(int), language (ENUM: en, kr, jp), section name(VARCHAR 255), name of contents (VARCHAR 255), html tag (VARCHAR 255), contents (TEXT)
*/

CREATE TABLE html_page_name (
    idx INT AUTO_INCREMENT PRIMARY KEY,
    language ENUM('en', 'kr', 'jp') NOT NULL,
    section_name VARCHAR(255) NOT NULL,
    name_of_contents VARCHAR(255) NOT NULL,
    html_tag VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL
);
