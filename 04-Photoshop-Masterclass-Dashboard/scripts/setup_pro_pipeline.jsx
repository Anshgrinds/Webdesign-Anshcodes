/**
 * PHLEARN 30 Days of Photoshop — Pro Retouching & Compositing Pipeline Setup
 * Automatically builds the standardized non-destructive layer stack taught by Aaron Nace.
 */

#target photoshop

app.bringToFront();

function main() {
    var doc;
    if (app.documents.length === 0) {
        // Create 1920x1080 300DPI sRGB canvas if no doc open
        doc = app.documents.add(1920, 1080, 300, "PHLEARN_Pro_Template", NewDocumentMode.RGB, DocumentFill.WHITE);
    } else {
        doc = app.activeDocument;
    }

    // Suspend history so the entire setup is a single undo step
    doc.suspendHistory("Setup PHLEARN Master Pipeline", "buildLayerStructure(doc)");
}

function buildLayerStructure(doc) {
    // Helper to create Layer Set (Group)
    function createGroup(name) {
        var group = doc.layerSets.add();
        group.name = name;
        return group;
    }

    // 05. Color Grade & Look Dev
    var groupColor = createGroup("05_COLOR_GRADE & LOOK_DEV");
    
    // 04. Dodge & Burn Group
    var groupDB = createGroup("04_DODGE_AND_BURN");
    
    // 03. Frequency Separation Group
    var groupFS = createGroup("03_FREQUENCY_SEPARATION");
    
    // 02. Local Adjustments Group
    var groupLocal = createGroup("02_LOCAL_ADJUSTMENTS");
    
    // 01. Blemish Cleanup & Retouch Group
    var groupClean = createGroup("01_CLEANUP_RETOUCH");
    
    // Create an empty cleanup layer for spot healing / clone stamp
    var cleanLayer = doc.artLayers.add();
    cleanLayer.name = "Blemish_Removal (Sample All Layers)";
    cleanLayer.move(groupClean, ElementPlacement.INSIDE);

    // Create Dodge & Burn helper layers
    var burnLayer = doc.artLayers.add();
    burnLayer.name = "Burn (Shadow Contouring - Soft Light)";
    burnLayer.blendMode = BlendMode.SOFTLIGHT;
    burnLayer.move(groupDB, ElementPlacement.INSIDE);

    var dodgeLayer = doc.artLayers.add();
    dodgeLayer.name = "Dodge (Highlight Sculpting - Soft Light)";
    dodgeLayer.blendMode = BlendMode.SOFTLIGHT;
    dodgeLayer.move(groupDB, ElementPlacement.INSIDE);

    // Alert completion
    alert("PHLEARN 30-Day Professional Non-Destructive Stack Initialized!\n\nGroups Created:\n- 05_COLOR_GRADE & LOOK_DEV\n- 04_DODGE_AND_BURN\n- 03_FREQUENCY_SEPARATION\n- 02_LOCAL_ADJUSTMENTS\n- 01_CLEANUP_RETOUCH");
}

main();
