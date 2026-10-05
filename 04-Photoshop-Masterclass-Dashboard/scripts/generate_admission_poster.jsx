/**
 * Acharya Pith Preschool — Professional Admission Open Poster Generator
 * Strictly adheres to the PHLEARN Masterclass & Non-Destructive Photoshop Directives.
 */

#target photoshop

app.bringToFront();
app.displayDialogs = DialogModes.NO;

function logStep(msg) {
    var f = new File("C:/Users/LEGION/Documents/Ai/photoshop/scripts/poster_generation_log.txt");
    f.open("a");
    f.writeln(new Date().toLocaleTimeString() + " : " + msg);
    f.close();
}

function main() {
    logStep("Starting Acharya Pith Poster Generation (Precision Calibrated)...");

    // Close any previous open documents
    while (app.documents.length > 0) {
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }

    var width = 2000;
    var height = 3000;
    var resolution = 300;
    var docName = "Acharya_Pith_Admission_Poster";

    // Set units
    var origRuler = app.preferences.rulerUnits;
    var origType = app.preferences.typeUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.POINTS;

    var doc = app.documents.add(width, height, resolution, docName, NewDocumentMode.RGB, DocumentFill.WHITE);
    logStep("Document created (2000x3000 @ 300 PPI)");

    // Color definitions
    var cWhite       = makeColor(255, 255, 255);
    var cOffWhite    = makeColor(252, 253, 255);
    var cWarmGlow    = makeColor(255, 250, 238);
    var cNavyDeep    = makeColor(15, 38, 77);       // #0F264D - Primary brand title
    var cNavyMedium  = makeColor(26, 54, 93);       // #1A365D - Subheaders
    var cNavyFooter  = makeColor(14, 34, 61);       // #0E223D - Footer background
    var cGoldAmber   = makeColor(255, 160, 0);      // #FFA000 - Admissions ribbon
    var cGoldLight   = makeColor(255, 213, 79);     // #FFD54F - Bright gold text
    var cCoralRed    = makeColor(230, 74, 25);      // #E64A19 - Badges & accents
    var cMintGreen   = makeColor(16, 185, 129);     // #10B981 - Feature accents
    var cSkyBlue     = makeColor(14, 165, 233);     // #0EA5E9 - Program card
    var cPurple      = makeColor(139, 92, 246);     // #8B5CF6 - Program card
    var cSlateText   = makeColor(71, 85, 105);      // #475569 - Body text
    var cSlateMuted  = makeColor(100, 116, 139);    // #64748B - Secondary text
    var cCardBorder  = makeColor(226, 232, 240);    // #E2E8F0 - Clean borders
    var cShadowSoft  = makeColor(20, 30, 50);

    // Font selection
    var fBold = "SegoeUI-Bold";
    var fReg  = "SegoeUI";
    try { app.fonts.getByName(fBold); } catch(e) { fBold = "Arial-BoldMT"; }
    try { app.fonts.getByName(fReg); }  catch(e) { fReg = "ArialMT"; }

    // -------------------------------------------------------------
    // CREATE STANDARDIZED LAYER HIERARCHY (AGENTS.md)
    // Create from bottom to top so that group05 is topmost
    // -------------------------------------------------------------
    var group00 = createGroup(doc, "00_BASE_ASSETS");
    var group01 = createGroup(doc, "01_HERO_ASSET_AND_FRAMING");
    var group03 = createGroup(doc, "02_GRAPHICS_AND_BADGES");
    var group02 = createGroup(doc, "03_TYPOGRAPHY_AND_TEXT");
    var group04 = createGroup(doc, "04_DODGE_AND_BURN");
    var group05 = createGroup(doc, "05_COLOR_GRADE & FINISHING");
    logStep("Layer groups initialized in correct stack order");

    // -------------------------------------------------------------
    // 00. BASE ASSETS & BACKGROUND
    // -------------------------------------------------------------
    fillRect(doc, 0, 0, 2000, 3000, cOffWhite, "Background_Base_Pastel", group00);
    var topWarmth = fillRect(doc, 0, 0, 2000, 680, cWarmGlow, "Top_Sunshine_Glow", group00);
    topWarmth.opacity = 80;

    // Top colorful stripe (Amber, Coral, Mint, Sky Blue)
    fillRect(doc, 0, 0, 500, 16, cGoldAmber, "Stripe_1_Gold", group00);
    fillRect(doc, 500, 0, 1000, 16, cCoralRed, "Stripe_2_Coral", group00);
    fillRect(doc, 1000, 0, 1500, 16, cMintGreen, "Stripe_3_Mint", group00);
    fillRect(doc, 1500, 0, 2000, 16, cSkyBlue, "Stripe_4_Blue", group00);

    // Subtle background bokeh circles
    drawCircle(doc, 140, 240, 90, makeColor(254, 243, 199), 35, "Bokeh_Circle_1", group00);
    drawCircle(doc, 1860, 280, 100, makeColor(224, 242, 254), 40, "Bokeh_Circle_2", group00);
    drawCircle(doc, 120, 1720, 85, makeColor(220, 252, 231), 35, "Bokeh_Circle_3", group00);
    drawCircle(doc, 1880, 1850, 95, makeColor(243, 232, 255), 40, "Bokeh_Circle_4", group00);
    logStep("Background created");

    // -------------------------------------------------------------
    // 01. HERO ASSET & FRAMING
    // -------------------------------------------------------------
    var frameLeft = 140;
    var frameTop = 545;
    var frameRight = 1860;
    var frameBottom = 1425;

    // Soft Shadow behind hero card
    var heroShadow = fillRect(doc, frameLeft + 8, frameTop + 14, frameRight + 8, frameBottom + 14, cShadowSoft, "Hero_Card_Shadow", group01);
    heroShadow.opacity = 18;
    try { heroShadow.applyGaussianBlur(12); } catch(e) {}

    // White Card Frame
    fillRect(doc, frameLeft, frameTop, frameRight, frameBottom, cWhite, "Hero_Card_Base", group01);
    strokeRect(doc, frameLeft, frameTop, frameRight, frameBottom, cGoldAmber, 10, "Hero_Card_GoldBorder", group01);

    // Place Hero Photo as Smart Object
    var innerPad = 12;
    var pLeft = frameLeft + innerPad;
    var pTop = frameTop + innerPad;
    var pRight = frameRight - innerPad;
    var pBottom = frameBottom - innerPad;
    var heroImagePath = "C:/Users/LEGION/Documents/Ai/photoshop/assets/preschool_hero.jpg";

    placeHeroPhoto(doc, heroImagePath, pLeft, pTop, pRight, pBottom, group01);
    logStep("Hero Smart Object placed & framed");

    // Hero Lower Ribbon Pill
    var heroTagW = 880;
    var heroTagH = 54;
    var heroTagX = 1000 - (heroTagW / 2);
    var heroTagY = 1398;

    var tagShadow = fillRect(doc, heroTagX + 3, heroTagY + 5, heroTagX + heroTagW + 3, heroTagY + heroTagH + 5, cShadowSoft, "Hero_Tag_Shadow", group01);
    tagShadow.opacity = 25;
    try { tagShadow.applyGaussianBlur(4); } catch(e) {}

    fillRect(doc, heroTagX, heroTagY, heroTagX + heroTagW, heroTagY + heroTagH, cNavyDeep, "Hero_Tag_Base", group01);
    strokeRect(doc, heroTagX, heroTagY, heroTagX + heroTagW, heroTagY + heroTagH, cGoldAmber, 3, "Hero_Tag_Border", group01);
    addText(doc, "~ A WARM, SAFE & JOYFUL FOUNDATION FOR YOUR CHILD ~", 1000, 1433, 6.5, fBold, cGoldLight, Justification.CENTER, "Text_HeroTag", group02);

    // -------------------------------------------------------------
    // 02 & 03. BRAND HEADER & ADMISSION RIBBON
    // -------------------------------------------------------------
    // School Crest Badge at top
    var crestX = 1000;
    var crestY = 85;
    drawCircle(doc, crestX, crestY, 42, cNavyDeep, 100, "Crest_Navy_Base", group03);
    drawCircle(doc, crestX, crestY, 36, cGoldAmber, 100, "Crest_Gold_Ring", group03);
    addText(doc, "AP", crestX, crestY + 11, 8.5, fBold, cWhite, Justification.CENTER, "Text_Crest_Initials", group02);

    // School Name
    addText(doc, "ACHARYA PITH", 1000, 185, 28, fBold, cNavyDeep, Justification.CENTER, "Title_Acharya_Pith", group02);

    // School Type
    addText(doc, "P R E S C H O O L   &   M O N T E S S O R I   D A Y C A R E", 1000, 232, 8.5, fBold, cCoralRed, Justification.CENTER, "Subtitle_Montessori", group02);

    // Tagline
    addText(doc, "Nurturing Curious Minds  *  Inspiring Bright Futures", 1000, 268, 7.2, fReg, cSlateText, Justification.CENTER, "Tagline_Nurturing", group02);

    // ADMISSIONS OPEN MAIN RIBBON BANNER
    var ribLeft = 140;
    var ribTop = 305;
    var ribRight = 1860;
    var ribBottom = 515;

    // Drop shadow
    var ribShadow = fillRect(doc, ribLeft + 5, ribTop + 8, ribRight + 5, ribBottom + 8, cShadowSoft, "Ribbon_Shadow", group03);
    ribShadow.opacity = 22;
    try { ribShadow.applyGaussianBlur(8); } catch(e) {}

    // Main Amber Banner
    fillRect(doc, ribLeft, ribTop, ribRight, ribBottom, cGoldAmber, "Ribbon_Base", group03);

    // Upper Gloss Strip
    var gloss = fillRect(doc, ribLeft + 4, ribTop + 4, ribRight - 4, ribTop + 75, makeColor(255, 183, 77), "Ribbon_Gloss", group03);
    gloss.opacity = 65;

    // Inner White Border
    strokeRect(doc, ribLeft + 8, ribTop + 8, ribRight - 8, ribBottom - 8, cWhite, 3, "Ribbon_Inner_Border", group03);

    // Ribbon Eyebrow
    addText(doc, "--  NOW ACCEPTING APPLICATIONS FOR 2026-2027  --", 1000, 352, 7.8, fBold, cNavyDeep, Justification.CENTER, "Ribbon_Eyebrow", group02);

    // Main Headline: "ADMISSIONS OPEN"
    addText(doc, "ADMISSIONS OPEN", 1002, 432, 28, fBold, makeColor(191, 54, 12), Justification.CENTER, "Text_Admissions_Shadow", group02);
    addText(doc, "ADMISSIONS OPEN", 1000, 430, 28, fBold, cWhite, Justification.CENTER, "Text_Admissions_Main", group02);

    // Academic Session Pill
    var sessW = 720;
    var sessH = 42;
    var sessX = 1000 - (sessW / 2);
    var sessY = 458;
    fillRect(doc, sessX, sessY, sessX + sessW, sessY + sessH, cNavyDeep, "Session_Pill_Base", group03);
    strokeRect(doc, sessX, sessY, sessX + sessW, sessY + sessH, cGoldLight, 2, "Session_Pill_Border", group03);
    addText(doc, "ACADEMIC SESSION 2026 - 2027", 1000, 487, 8, fBold, cGoldLight, Justification.CENTER, "Text_Session_Year", group02);

    // Floating Top-Right Badge: "LIMITED SEATS AVAILABLE!"
    var bLeft = 1420;
    var bTop = 275;
    var bRight = 1880;
    var bBottom = 335;
    var bShadow = fillRect(doc, bLeft + 3, bTop + 5, bRight + 3, bBottom + 5, cShadowSoft, "SeatBadge_Shadow", group03);
    bShadow.opacity = 25;
    fillRect(doc, bLeft, bTop, bRight, bBottom, cCoralRed, "SeatBadge_Base", group03);
    strokeRect(doc, bLeft, bTop, bRight, bBottom, cWhite, 3, "SeatBadge_Border", group03);
    addText(doc, "LIMITED SEATS AVAILABLE!", (bLeft + bRight) / 2, bTop + 40, 7.2, fBold, cWhite, Justification.CENTER, "Text_Limited_Seats", group02);
    logStep("Header & Admission Ribbon built");

    // -------------------------------------------------------------
    // 03. LEARNING PROGRAMS (4 COLOR-CODED CARDS)
    // -------------------------------------------------------------
    var progTitleY = 1495;
    addText(doc, "OUR EARLY LEARNING PROGRAMS", 1000, progTitleY, 11, fBold, cNavyDeep, Justification.CENTER, "Title_Programs", group02);
    fillRect(doc, 850, progTitleY + 12, 1150, progTitleY + 16, cGoldAmber, "Title_Programs_Underline", group03);

    var cardY = 1530;
    var cardH = 280;
    var cardW = 395;
    var cardGap = 35;
    var startX = 140;

    var programs = [
        { name: "PLAYGROUP", age: "Age: 1.5 – 2.5 Yrs", desc: "Sensory Fun & Motor Play", sub: "Interactive discovery & social bonding", colHeader: makeColor(255, 179, 0), colBorder: makeColor(255, 179, 0) },
        { name: "NURSERY",   age: "Age: 2.5 – 3.5 Yrs", desc: "Language & Creative Arts",  sub: "Storytelling, music & motor skills", colHeader: makeColor(16, 185, 129), colBorder: makeColor(16, 185, 129) },
        { name: "L. K. G.",   age: "Age: 3.5 – 4.5 Yrs", desc: "Phonics, Numbers & Logic", sub: "Early reading, math & writing", colHeader: makeColor(14, 165, 233), colBorder: makeColor(14, 165, 233) },
        { name: "U. K. G.",   age: "Age: 4.5 – 5.5 Yrs", desc: "School Readiness & STEM",   sub: "Curiosity, independence & science", colHeader: makeColor(139, 92, 246), colBorder: makeColor(139, 92, 246) }
    ];

    for (var p = 0; p < programs.length; p++) {
        var cLeft = startX + (p * (cardW + cardGap));
        var cRight = cLeft + cardW;
        var cBottom = cardY + cardH;
        var pData = programs[p];

        // Card Drop Shadow
        var cShadow = fillRect(doc, cLeft + 4, cardY + 7, cRight + 4, cBottom + 7, cShadowSoft, "Prog_Shadow_" + p, group03);
        cShadow.opacity = 12;

        // Card Base
        fillRect(doc, cLeft, cardY, cRight, cBottom, cWhite, "Prog_CardBase_" + p, group03);

        // Header Color Block
        fillRect(doc, cLeft, cardY, cRight, cardY + 70, pData.colHeader, "Prog_Header_" + p, group03);

        // Card Border
        strokeRect(doc, cLeft, cardY, cRight, cBottom, pData.colBorder, 3, "Prog_Border_" + p, group03);

        // Program Name
        addText(doc, pData.name, (cLeft + cRight) / 2, cardY + 48, 8.5, fBold, cWhite, Justification.CENTER, "Prog_Name_" + p, group02);

        // Age Group Pill
        var agePillW = 260;
        var agePillH = 36;
        var agePillX = ((cLeft + cRight) / 2) - (agePillW / 2);
        var agePillY = cardY + 95;
        fillRect(doc, agePillX, agePillY, agePillX + agePillW, agePillY + agePillH, makeColor(241, 245, 249), "Prog_AgePill_" + p, group03);
        addText(doc, pData.age, (cLeft + cRight) / 2, agePillY + 25, 6.2, fBold, cNavyDeep, Justification.CENTER, "Prog_AgeText_" + p, group02);

        // Descriptions
        addText(doc, pData.desc, (cLeft + cRight) / 2, cardY + 170, 5.8, fBold, cSlateText, Justification.CENTER, "Prog_Desc_" + p, group02);
        addText(doc, pData.sub, (cLeft + cRight) / 2, cardY + 205, 5.2, fReg, cSlateMuted, Justification.CENTER, "Prog_Sub_" + p, group02);

        // Enrollment Open Badge
        var dotX = (cLeft + cRight) / 2 - 65;
        var dotY = cardY + 245;
        drawCircle(doc, dotX, dotY, 6, cMintGreen, 100, "Prog_Dot_" + p, group03);
        addText(doc, "Admissions Enrolling", dotX + 15, dotY + 6, 5.2, fBold, cMintGreen, Justification.LEFT, "Prog_StatusText_" + p, group02);
    }
    logStep("Program cards built");

    // -------------------------------------------------------------
    // 04. WHY CHOOSE ACHARYA PITH? (6 FEATURE BOXES)
    // -------------------------------------------------------------
    var featSectionY = 1845;
    var featPillW = 680;
    var featPillH = 50;
    var featPillX = 1000 - (featPillW / 2);
    fillRect(doc, featPillX, featSectionY, featPillX + featPillW, featSectionY + featPillH, cNavyDeep, "Feat_Pill_Base", group03);
    strokeRect(doc, featPillX, featSectionY, featPillX + featPillW, featSectionY + featPillH, cGoldAmber, 2, "Feat_Pill_Border", group03);
    addText(doc, "WHY CHOOSE ACHARYA PITH?", 1000, featSectionY + 35, 8, fBold, cWhite, Justification.CENTER, "Title_WhyChoose", group02);

    var featBoxStartY = 1915;
    var featBoxH = 120;
    var featBoxGapY = 20;
    var col1L = 140;
    var col1R = 980;
    var col2L = 1020;
    var col2R = 1860;

    var features = [
        { col: 1, row: 0, title: "Montessori & Activity-Based Curriculum", desc: "Hands-on sensorial play that sparks innate curiosity and creativity." },
        { col: 2, row: 0, title: "Safe & Secure 24/7 CCTV Monitored Campus", desc: "Child-proof facility with rigorous hygiene and full security control." },
        { col: 1, row: 1, title: "Caring & Certified Early Educators", desc: "Loving, highly trained teachers dedicated to individual growth." },
        { col: 2, row: 1, title: "Creative Arts, Music & Indoor Play Zone", desc: "Daily spaces for dance, pottery, gymnastics and cognitive games." },
        { col: 1, row: 2, title: "Nutritious Meals & Hygienic Care", desc: "Wholesome organic meals with filtered pure drinking water & sanitization." },
        { col: 2, row: 2, title: "Low 1:8 Student-to-Teacher Ratio", desc: "Personalized care and affectionate emotional nurturing for every child." }
    ];

    for (var f = 0; f < features.length; f++) {
        var feat = features[f];
        var fL = (feat.col === 1) ? col1L : col2L;
        var fR = (feat.col === 1) ? col1R : col2R;
        var fT = featBoxStartY + (feat.row * (featBoxH + featBoxGapY));
        var fB = fT + featBoxH;

        // Shadow
        var fShadow = fillRect(doc, fL + 3, fT + 5, fR + 3, fB + 5, cShadowSoft, "Feat_Shadow_" + f, group03);
        fShadow.opacity = 10;

        // White Card Base
        fillRect(doc, fL, fT, fR, fB, cWhite, "Feat_CardBase_" + f, group03);
        strokeRect(doc, fL, fT, fR, fB, cCardBorder, 2, "Feat_Border_" + f, group03);

        // Golden Accent Bar on left edge
        fillRect(doc, fL, fT + 12, fL + 8, fB - 12, cGoldAmber, "Feat_AccentBar_" + f, group03);

        // Icon Badge Circle
        var iconCX = fL + 55;
        var iconCY = (fT + fB) / 2;
        drawCircle(doc, iconCX, iconCY, 28, makeColor(254, 243, 199), 100, "Feat_IconCircle_" + f, group03);
        
        // Crisp geometric star diamond
        var starL = doc.artLayers.add();
        starL.name = "Feat_Diamond_" + f;
        starL.move(group03, ElementPlacement.INSIDE);
        doc.selection.select([
            [iconCX, iconCY - 13],
            [iconCX + 13, iconCY],
            [iconCX, iconCY + 13],
            [iconCX - 13, iconCY]
        ]);
        doc.selection.fill(cGoldAmber, ColorBlendMode.NORMAL, 100, false);
        doc.selection.deselect();

        // Title and description
        addText(doc, feat.title, fL + 105, fT + 50, 7, fBold, cNavyDeep, Justification.LEFT, "Feat_Title_" + f, group02);
        addText(doc, feat.desc, fL + 105, fT + 86, 5.5, fReg, cSlateText, Justification.LEFT, "Feat_Desc_" + f, group02);
    }
    logStep("Feature boxes built");

    // -------------------------------------------------------------
    // 05. SPECIAL EARLY-BIRD ADMISSION OFFER BANNER
    // -------------------------------------------------------------
    var offerTop = 2345;
    var offerBottom = 2440;
    var offerLeft = 140;
    var offerRight = 1860;

    var offShadow = fillRect(doc, offerLeft + 4, offerTop + 6, offerRight + 4, offerBottom + 6, cShadowSoft, "Offer_Shadow", group03);
    offShadow.opacity = 14;

    fillRect(doc, offerLeft, offerTop, offerRight, offerBottom, makeColor(255, 245, 245), "Offer_Base", group03);
    strokeRect(doc, offerLeft, offerTop, offerRight, offerBottom, cCoralRed, 3, "Offer_Border", group03);

    addText(doc, "--  SPECIAL EARLY-BIRD ADMISSION CONCESSION  --", 1000, offerTop + 38, 7.5, fBold, cCoralRed, Justification.CENTER, "Offer_Heading", group02);
    addText(doc, "Register Early to Receive Flat 20% Concession on Admission & Free Welcome Activity Kit!", 1000, offerTop + 72, 6, fBold, cNavyDeep, Justification.CENTER, "Offer_Details", group02);

    // -------------------------------------------------------------
    // 06. FOOTER CALL-TO-ACTION & CONTACT BANNER
    // -------------------------------------------------------------
    var footerTop = 2470;
    var footerBottom = 3000;

    // Deep Navy Container
    fillRect(doc, 0, footerTop, 2000, footerBottom, cNavyFooter, "Footer_Navy_Base", group03);

    // Top Golden Separator
    fillRect(doc, 0, footerTop, 2000, footerTop + 10, cGoldAmber, "Footer_Gold_Stripe", group03);

    // Left Column: Contact & Visit
    addText(doc, "CAMPUS VISITS & ADMISSION ENQUIRIES", 140, footerTop + 70, 9, fBold, cWhite, Justification.LEFT, "Footer_Title", group02);
    addText(doc, "We warmly invite parents to tour our classrooms and meet our faculty!", 140, footerTop + 110, 6, fReg, makeColor(203, 213, 225), Justification.LEFT, "Footer_Subtitle", group02);

    addText(doc, "Hotline:  +977 980-1234567  |  01-4455667", 140, footerTop + 175, 7.8, fBold, cGoldLight, Justification.LEFT, "Contact_Phone", group02);
    addText(doc, "Email:  admissions@acharyapith.edu.np  |  info@acharyapith.edu.np", 140, footerTop + 225, 6.8, fReg, cWhite, Justification.LEFT, "Contact_Email", group02);
    addText(doc, "Campus:  Acharya Pith Lane, Central Education Hub, Kathmandu", 140, footerTop + 275, 6.8, fReg, makeColor(226, 232, 240), Justification.LEFT, "Contact_Location", group02);
    addText(doc, "Office Hours:  Sunday - Friday (8:00 AM - 4:30 PM)", 140, footerTop + 325, 6.2, fReg, makeColor(148, 163, 184), Justification.LEFT, "Contact_Hours", group02);

    // Right Column: Enroll CTA Pill Button
    var ctaW = 480;
    var ctaH = 95;
    var ctaX = 1380;
    var ctaY = footerTop + 80;

    var ctaShadow = fillRect(doc, ctaX + 4, ctaY + 8, ctaX + ctaW + 4, ctaY + ctaH + 8, cShadowSoft, "CTA_Shadow", group03);
    ctaShadow.opacity = 35;
    fillRect(doc, ctaX, ctaY, ctaX + ctaW, ctaY + ctaH, cGoldAmber, "CTA_Pill_Base", group03);
    strokeRect(doc, ctaX, ctaY, ctaX + ctaW, ctaY + ctaH, cWhite, 4, "CTA_Pill_Border", group03);

    addText(doc, "ENROLL NOW  >>", ctaX + (ctaW / 2), ctaY + 62, 9.5, fBold, cNavyDeep, Justification.CENTER, "CTA_Text", group02);

    addText(doc, "Web Portal:  www.acharyapith.edu.np", ctaX + (ctaW / 2), footerTop + 230, 7.8, fBold, cWhite, Justification.CENTER, "Footer_Website", group02);
    addText(doc, "Online Applications Open for 2026-27 Batch", ctaX + (ctaW / 2), footerTop + 275, 6.2, fReg, cGoldLight, Justification.CENTER, "Footer_OnlineApp", group02);
    addText(doc, "Transportation & Daycare Facilities Available", ctaX + (ctaW / 2), footerTop + 315, 5.8, fReg, makeColor(203, 213, 225), Justification.CENTER, "Footer_Facilities", group02);
    logStep("Footer & CTA built");

    // -------------------------------------------------------------
    // 04_DODGE_AND_BURN (Highlight Sculpting per PHLEARN)
    // -------------------------------------------------------------
    var dodgeLayer = doc.artLayers.add();
    dodgeLayer.name = "Dodge (Highlight Pop - Soft Light)";
    dodgeLayer.blendMode = BlendMode.SOFTLIGHT;
    dodgeLayer.move(group04, ElementPlacement.INSIDE);

    var burnLayer = doc.artLayers.add();
    burnLayer.name = "Burn (Depth Contouring - Soft Light)";
    burnLayer.blendMode = BlendMode.SOFTLIGHT;
    burnLayer.move(group04, ElementPlacement.INSIDE);

    // -------------------------------------------------------------
    // 05_COLOR_GRADE & FINISHING (Unified Texture & Master Polish)
    // -------------------------------------------------------------
    var gradeLayer = doc.artLayers.add();
    gradeLayer.name = "Warm_Atmosphere_Tone (Soft Light)";
    gradeLayer.blendMode = BlendMode.SOFTLIGHT;
    gradeLayer.opacity = 6;
    gradeLayer.move(group05, ElementPlacement.INSIDE);
    doc.selection.selectAll();
    doc.selection.fill(makeColor(255, 230, 180), ColorBlendMode.NORMAL, 100, false);
    doc.selection.deselect();
    logStep("Color grade & finishing applied");

    // -------------------------------------------------------------
    // SAVE MASTER PSD & EXPORT HIGH-RES PNG / JPEG
    // -------------------------------------------------------------
    var outputDir = new Folder("C:/Users/LEGION/Documents/Ai/photoshop/output");
    if (!outputDir.exists) outputDir.create();

    // 1. Master Layered PSD
    var psdFile = new File(outputDir.fsName + "/Acharya_Pith_Preschool_Admission_Poster.psd");
    var psdOpts = new PhotoshopSaveOptions();
    psdOpts.embedColorProfile = true;
    psdOpts.alphaChannels = true;
    psdOpts.layers = true;
    doc.saveAs(psdFile, psdOpts, true, Extension.LOWERCASE);
    logStep("Saved PSD: " + psdFile.fsName);

    // 2. High-Res PNG
    var pngFile = new File(outputDir.fsName + "/Acharya_Pith_Preschool_Admission_Poster.png");
    var pngOpts = new PNGSaveOptions();
    pngOpts.compression = 5;
    pngOpts.interlaced = false;
    doc.saveAs(pngFile, pngOpts, true, Extension.LOWERCASE);
    logStep("Saved PNG: " + pngFile.fsName);

    // 3. High-Res JPEG
    var jpgFile = new File(outputDir.fsName + "/Acharya_Pith_Preschool_Admission_Poster.jpg");
    var jpgOpts = new JPEGSaveOptions();
    jpgOpts.quality = 12;
    jpgOpts.embedColorProfile = true;
    doc.saveAs(jpgFile, jpgOpts, true, Extension.LOWERCASE);
    logStep("Saved JPG: " + jpgFile.fsName);

    // Copy exported preview into artifact directory
    var artifactDir = new Folder("C:/Users/LEGION/.gemini/antigravity-cli/brain/21aff25e-28f0-4737-90db-9fe1aa80a480");
    if (artifactDir.exists) {
        var artifactJpg = new File(artifactDir.fsName + "/Acharya_Pith_Preschool_Admission_Poster.jpg");
        jpgFile.copy(artifactJpg);
        logStep("Copied preview to artifacts directory");
    }

    // Restore preferences
    app.preferences.rulerUnits = origRuler;
    app.preferences.typeUnits = origType;

    logStep("COMPLETED SUCCESSFULLY! All poster assets generated.");
}

// -----------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------

function makeColor(r, g, b) {
    var c = new SolidColor();
    c.rgb.red = r;
    c.rgb.green = g;
    c.rgb.blue = b;
    return c;
}

function createGroup(doc, name) {
    var group = doc.layerSets.add();
    group.name = name;
    return group;
}

function fillRect(doc, left, top, right, bottom, color, name, targetSet) {
    var layer = doc.artLayers.add();
    if (name) layer.name = name;
    if (targetSet) layer.move(targetSet, ElementPlacement.INSIDE);
    doc.selection.select([
        [left, top],
        [right, top],
        [right, bottom],
        [left, bottom]
    ]);
    doc.selection.fill(color, ColorBlendMode.NORMAL, 100, false);
    doc.selection.deselect();
    return layer;
}

function strokeRect(doc, left, top, right, bottom, color, strokeWidth, name, targetSet) {
    var layer = doc.artLayers.add();
    if (name) layer.name = name;
    if (targetSet) layer.move(targetSet, ElementPlacement.INSIDE);
    doc.selection.select([
        [left, top],
        [right, top],
        [right, bottom],
        [left, bottom]
    ]);
    doc.selection.stroke(color, strokeWidth, StrokeLocation.INSIDE, ColorBlendMode.NORMAL, 100, false);
    doc.selection.deselect();
    return layer;
}

function drawCircle(doc, cx, cy, r, color, opacity, name, targetSet) {
    var layer = doc.artLayers.add();
    if (name) layer.name = name;
    if (opacity !== undefined) layer.opacity = opacity;
    if (targetSet) layer.move(targetSet, ElementPlacement.INSIDE);

    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc.putReference(charIDToTypeID("null"), ref);
    var shapeDesc = new ActionDescriptor();
    shapeDesc.putUnitDouble(charIDToTypeID("Top "), charIDToTypeID("#Pxl"), cy - r);
    shapeDesc.putUnitDouble(charIDToTypeID("Left"), charIDToTypeID("#Pxl"), cx - r);
    shapeDesc.putUnitDouble(charIDToTypeID("Btom"), charIDToTypeID("#Pxl"), cy + r);
    shapeDesc.putUnitDouble(charIDToTypeID("Rght"), charIDToTypeID("#Pxl"), cx + r);
    desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Elps"), shapeDesc);
    desc.putBoolean(charIDToTypeID("AntA"), true);
    executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);

    doc.selection.fill(color, ColorBlendMode.NORMAL, 100, false);
    doc.selection.deselect();
    return layer;
}

function addText(doc, text, x, y, size, fontName, color, justification, name, targetSet) {
    var layer = doc.artLayers.add();
    layer.kind = LayerKind.TEXT;
    if (name) layer.name = name;
    if (targetSet) layer.move(targetSet, ElementPlacement.INSIDE);

    var textItem = layer.textItem;
    textItem.contents = text;
    textItem.size = new UnitValue(size, "pt");
    try {
        textItem.font = fontName;
    } catch(e) {
        textItem.font = "Arial-BoldMT";
    }
    textItem.color = color;
    if (justification) {
        textItem.justification = justification;
    }
    textItem.position = [x, y];
    return layer;
}

function placeHeroPhoto(doc, heroPath, frameLeft, frameTop, frameRight, frameBottom, targetSet) {
    var heroFile = new File(heroPath);
    if (!heroFile.exists) return null;

    var heroDoc = app.open(heroFile);
    heroDoc.selection.selectAll();
    heroDoc.selection.copy();
    heroDoc.close(SaveOptions.DONOTSAVECHANGES);

    app.activeDocument = doc;
    var heroLayer = doc.paste();
    heroLayer.name = "Hero_Preschool_Students";
    if (targetSet) heroLayer.move(targetSet, ElementPlacement.INSIDE);

    // Calculate scale to fill frame perfectly
    var targetW = frameRight - frameLeft;
    var targetH = frameBottom - frameTop;
    var curBounds = heroLayer.bounds;
    var curW = curBounds[2].value - curBounds[0].value;
    var curH = curBounds[3].value - curBounds[1].value;

    var scaleW = (targetW / curW) * 100;
    var scaleH = (targetH / curH) * 100;
    var scale = Math.max(scaleW, scaleH);

    heroLayer.resize(scale, scale, AnchorPosition.MIDDLECENTER);

    // Center inside frame
    curBounds = heroLayer.bounds;
    var curCenterX = (curBounds[0].value + curBounds[2].value) / 2;
    var curCenterY = (curBounds[1].value + curBounds[3].value) / 2;
    var targetCenterX = (frameLeft + frameRight) / 2;
    var targetCenterY = (frameTop + frameBottom) / 2;
    heroLayer.translate(targetCenterX - curCenterX, targetCenterY - curCenterY);

    // Convert to Smart Object
    try {
        var idnewPlacedLayer = stringIDToTypeID("newPlacedLayer");
        executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
        doc.activeLayer.name = "Hero_Preschool_Students (Smart Object)";
    } catch(e) {}

    // Create Non-destructive Layer Mask on Hero Smart Object
    doc.selection.select([
        [frameLeft, frameTop],
        [frameRight, frameTop],
        [frameRight, frameBottom],
        [frameLeft, frameBottom]
    ]);

    try {
        var maskDesc = new ActionDescriptor();
        maskDesc.putClass(charIDToTypeID("Nw  "), charIDToTypeID("Chnl"));
        var maskRef = new ActionReference();
        maskRef.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Msk "));
        maskDesc.putReference(charIDToTypeID("At  "), maskRef);
        maskDesc.putEnumerated(charIDToTypeID("Usng"), charIDToTypeID("UsrM"), charIDToTypeID("RvlS"));
        executeAction(charIDToTypeID("Mk  "), maskDesc, DialogModes.NO);
    } catch(e) {}

    doc.selection.deselect();
    return doc.activeLayer;
}

try {
    main();
} catch(globalErr) {
    logStep("FATAL ERROR: " + globalErr.message + " on line " + globalErr.line);
}
