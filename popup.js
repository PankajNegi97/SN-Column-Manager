const profileName = document.getElementById("profileName");
const columns = document.getElementById("columns");
const saveBtn = document.getElementById("saveBtn");
const profilesDiv = document.getElementById("profiles");

loadProfiles();

saveBtn.addEventListener("click", async () => {

    const name = profileName.value.trim();

    if (!name) {
        alert("Enter a profile name.");
        return;
    }

    const list = columns.value
        .split("\n")
        .map(x => x.trim())
        .filter(x => x !== "");

    const result = await chrome.storage.local.get("profiles");

    const profiles = result.profiles || {};

    profiles[name] = list;

    await chrome.storage.local.set({
        profiles
    });

    profileName.value = "";

    columns.value = "";

    loadProfiles();

});

async function loadProfiles() {

    const result = await chrome.storage.local.get("profiles");

    const profiles = result.profiles || {};

    profilesDiv.innerHTML = "";

    const keys = Object.keys(profiles);

    if(keys.length===0){

        profilesDiv.innerHTML="No profiles yet";

        return;

    }

    keys.forEach(name=>{

        const div=document.createElement("div");

        div.style.padding="8px";

        div.style.marginBottom="6px";

        div.style.background="white";

        div.style.border="1px solid #ddd";

        div.style.borderRadius="5px";

        div.innerHTML=`
        <b>${name}</b><br>
        ${profiles[name].length} Columns
        `;

        profilesDiv.appendChild(div);

    });

}