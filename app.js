// Discord API Base URL
const DISCORD_API = 'https://discord.com/api/v10';
const DISCOHOOK_API = 'https://discohook.app/api';

// State management
let token = localStorage.getItem('discord_token') || '';
let serverId = localStorage.getItem('server_id') || '';
let serverData = null;
let channels = [];
let categories = [];

// Font transformation maps
const fontMaps = {
    bold: {
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
        'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽',
        'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
        'y': '𝘆', 'z': '𝘇', 'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙',
        'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡',
        'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩',
        'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭', '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯',
        '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
    },
    italic: {
        'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩',
        'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱',
        'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
        'y': '𝘺', 'z': '𝘻', 'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍',
        'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕',
        'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝',
        'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
    },
    monospace: {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑',
        'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙',
        'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡',
        'y': '𝚢', 'z': '𝚣', 'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵',
        'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽',
        'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅',
        'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉', '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹',
        '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
    },
    smallcaps: {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ',
        'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ',
        'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
        'y': 'ʏ', 'z': 'ᴢ'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Load saved token and server ID
    if (token) {
        document.getElementById('token').value = token;
    }
    if (serverId) {
        document.getElementById('serverId').value = serverId;
    }
    
    // Load server data if token exists
    if (token && serverId) {
        loadServerData();
    }
}

function setupEventListeners() {
    document.getElementById('saveToken').addEventListener('click', saveToken);
    document.getElementById('serverId').addEventListener('change', onServerIdChange);
    document.getElementById('deleteChannels').addEventListener('click', deleteChannels);
    document.getElementById('renameChannels').addEventListener('click', renameChannels);
    document.getElementById('copyChannels').addEventListener('click', copyChannels);
    document.getElementById('sendWebhook').addEventListener('click', sendWebhook);
    document.getElementById('sendEmbed').addEventListener('click', sendEmbed);
    document.getElementById('createShareLink').addEventListener('click', createShareLink);
    document.getElementById('clearLogs').addEventListener('click', clearLogs);
}

// Utility Functions
function log(message, type = 'info') {
    const logs = document.getElementById('logs');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const timestamp = new Date().toLocaleTimeString();
    entry.textContent = `[${timestamp}] ${message}`;
    logs.appendChild(entry);
    logs.scrollTop = logs.scrollHeight;
}

function clearLogs() {
    document.getElementById('logs').innerHTML = '';
    log('Logs cleared', 'info');
}

async function discordRequest(endpoint, method = 'GET', body = null) {
    if (!token) {
        throw new Error('Token not set');
    }
    
    const options = {
        method,
        headers: {
            'Authorization': `Bot ${token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'DiscordServerManager/1.0'
        }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(`${DISCORD_API}${endpoint}`, options);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || `HTTP ${response.status}`);
        }
        
        return data;
    } catch (error) {
        log(`API Error: ${error.message}`, 'error');
        throw error;
    }
}

// Token Management
async function saveToken() {
    const tokenInput = document.getElementById('token').value.trim();
    const serverIdInput = document.getElementById('serverId').value.trim();
    
    if (!tokenInput) {
        alert('Please enter a token');
        return;
    }
    
    if (!serverIdInput) {
        alert('Please enter a server ID');
        return;
    }
    
    token = tokenInput;
    serverId = serverIdInput;
    
    localStorage.setItem('discord_token', token);
    localStorage.setItem('server_id', serverId);
    
    log('Token and Server ID saved', 'success');
    await loadServerData();
}

async function onServerIdChange() {
    const serverIdInput = document.getElementById('serverId').value.trim();
    if (serverIdInput && token) {
        serverId = serverIdInput;
        localStorage.setItem('server_id', serverId);
        await loadServerData();
    }
}

// Server Data Loading
async function loadServerData() {
    if (!token || !serverId) {
        return;
    }
    
    try {
        log('Loading server data...', 'info');
        
        // Get server info
        serverData = await discordRequest(`/guilds/${serverId}`);
        
        // Get channels
        channels = await discordRequest(`/guilds/${serverId}/channels`);
        
        // Separate categories and channels
        categories = channels.filter(ch => ch.type === 4); // Category type
        const textChannels = channels.filter(ch => ch.type === 0); // Text channel type
        const voiceChannels = channels.filter(ch => ch.type === 2); // Voice channel type
        
        // Update UI
        updateServerInfo();
        updateCategorySelects();
        
        log(`Loaded ${channels.length} channels from server: ${serverData.name}`, 'success');
    } catch (error) {
        log(`Failed to load server data: ${error.message}`, 'error');
        alert(`Failed to load server data: ${error.message}`);
    }
}

function updateServerInfo() {
    if (!serverData) return;
    
    const serverInfoSection = document.getElementById('serverInfo');
    const serverDetails = document.getElementById('serverDetails');
    
    serverInfoSection.style.display = 'block';
    
    const textChannels = channels.filter(ch => ch.type === 0).length;
    const voiceChannels = channels.filter(ch => ch.type === 2).length;
    const categories = channels.filter(ch => ch.type === 4).length;
    
    serverDetails.innerHTML = `
        <div class="server-stat">
            <div class="server-stat-value">${serverData.member_count || 'N/A'}</div>
            <div class="server-stat-label">Members</div>
        </div>
        <div class="server-stat">
            <div class="server-stat-value">${textChannels}</div>
            <div class="server-stat-label">Text Channels</div>
        </div>
        <div class="server-stat">
            <div class="server-stat-value">${voiceChannels}</div>
            <div class="server-stat-label">Voice Channels</div>
        </div>
        <div class="server-stat">
            <div class="server-stat-value">${categories}</div>
            <div class="server-stat-label">Categories</div>
        </div>
    `;
}

function updateCategorySelects() {
    const categorySelect = document.getElementById('categorySelect');
    const renameCategorySelect = document.getElementById('renameCategorySelect');
    const copySourceCategory = document.getElementById('copySourceCategory');
    
    // Clear existing options
    categorySelect.innerHTML = '<option value="">All Channels</option>';
    renameCategorySelect.innerHTML = '<option value="">All Channels</option>';
    copySourceCategory.innerHTML = '<option value="">Select a category...</option>';
    
    // Add categories
    categories.forEach(category => {
        const option1 = document.createElement('option');
        option1.value = category.id;
        option1.textContent = category.name;
        categorySelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = category.id;
        option2.textContent = category.name;
        renameCategorySelect.appendChild(option2);
        
        const option3 = document.createElement('option');
        option3.value = category.id;
        option3.textContent = category.name;
        copySourceCategory.appendChild(option3);
    });
}

// Channel Management
async function deleteChannels() {
    if (!token || !serverId) {
        alert('Please set token and server ID first');
        return;
    }
    
    const categoryId = document.getElementById('categorySelect').value;
    const deleteCategoryItself = document.getElementById('deleteCategoryItself').checked;
    
    if (!confirm('Are you sure you want to delete these channels/category? This action cannot be undone!')) {
        return;
    }
    
    try {
        let channelsToDelete = [];
        let categoryToDelete = null;
        
        if (categoryId) {
            if (deleteCategoryItself) {
                // Delete the category itself
                categoryToDelete = categories.find(cat => cat.id === categoryId);
                if (!categoryToDelete) {
                    alert('Category not found');
                    return;
                }
                log(`Deleting category: ${categoryToDelete.name}`, 'warning');
            } else {
                // Get channels in category
                const categoryChannels = channels.filter(ch => 
                    ch.parent_id === categoryId && (ch.type === 0 || ch.type === 2)
                );
                channelsToDelete = categoryChannels;
                log(`Deleting ${categoryChannels.length} channels from category...`, 'warning');
            }
        } else {
            // Get all channels (excluding categories)
            channelsToDelete = channels.filter(ch => ch.type === 0 || ch.type === 2);
            log(`Deleting all ${channelsToDelete.length} channels...`, 'warning');
        }
        
        let deleted = 0;
        let failed = 0;
        
        // Delete channels first (if deleting category, channels will be deleted automatically)
        if (!deleteCategoryItself || !categoryId) {
            for (const channel of channelsToDelete) {
                try {
                    await discordRequest(`/channels/${channel.id}`, 'DELETE');
                    log(`Deleted channel: ${channel.name}`, 'success');
                    deleted++;
                } catch (error) {
                    log(`Failed to delete ${channel.name}: ${error.message}`, 'error');
                    failed++;
                }
                
                // Rate limit protection
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        
        // Delete category itself if requested
        if (deleteCategoryItself && categoryToDelete) {
            try {
                await discordRequest(`/channels/${categoryToDelete.id}`, 'DELETE');
                log(`Deleted category: ${categoryToDelete.name}`, 'success');
                deleted++;
            } catch (error) {
                log(`Failed to delete category ${categoryToDelete.name}: ${error.message}`, 'error');
                failed++;
            }
        }
        
        log(`Deletion complete: ${deleted} deleted, ${failed} failed`, deleted > 0 ? 'success' : 'error');
        
        // Reload server data
        await loadServerData();
    } catch (error) {
        log(`Error deleting channels: ${error.message}`, 'error');
    }
}

function transformText(text, fontStyle) {
    if (fontStyle === 'normal') {
        return text;
    }
    
    if (fontStyle === 'circled') {
        // Convert numbers to circled numbers
        return text.replace(/\d/g, (match) => {
            const circled = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];
            return circled[parseInt(match)] || match;
        });
    }
    
    const fontMap = fontMaps[fontStyle];
    if (!fontMap) return text;
    
    return text.split('').map(char => fontMap[char] || char).join('');
}

async function renameChannels() {
    if (!token || !serverId) {
        alert('Please set token and server ID first');
        return;
    }
    
    const symbol = document.getElementById('symbolInput').value.trim();
    const fontStyle = document.getElementById('fontStyle').value;
    const categoryId = document.getElementById('renameCategorySelect').value;
    
    try {
        let channelsToRename = [];
        
        if (categoryId) {
            channelsToRename = channels.filter(ch => 
                ch.parent_id === categoryId && (ch.type === 0 || ch.type === 2)
            );
        } else {
            channelsToRename = channels.filter(ch => ch.type === 0 || ch.type === 2);
        }
        
        if (channelsToRename.length === 0) {
            alert('No channels found to rename');
            return;
        }
        
        log(`Renaming ${channelsToRename.length} channels...`, 'info');
        
        let renamed = 0;
        let failed = 0;
        
        for (const channel of channelsToRename) {
            try {
                let newName = channel.name;
                
                // Apply symbol
                if (symbol) {
                    newName = symbol + ' ' + newName;
                }
                
                // Apply font transformation
                if (fontStyle !== 'normal') {
                    newName = transformText(newName, fontStyle);
                }
                
                // Discord channel name limits
                if (newName.length > 100) {
                    newName = newName.substring(0, 100);
                }
                
                await discordRequest(`/channels/${channel.id}`, 'PATCH', {
                    name: newName
                });
                
                log(`Renamed: ${channel.name} → ${newName}`, 'success');
                renamed++;
            } catch (error) {
                log(`Failed to rename ${channel.name}: ${error.message}`, 'error');
                failed++;
            }
            
            // Rate limit protection
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        log(`Rename complete: ${renamed} renamed, ${failed} failed`, renamed > 0 ? 'success' : 'error');
        
        // Reload server data
        await loadServerData();
    } catch (error) {
        log(`Error renaming channels: ${error.message}`, 'error');
    }
}

async function copyChannels() {
    if (!token || !serverId) {
        alert('Please set token and server ID first');
        return;
    }
    
    const sourceCategoryId = document.getElementById('copySourceCategory').value;
    const destinationServerId = document.getElementById('copyDestinationServer').value.trim();
    const destinationCategoryId = document.getElementById('copyDestinationCategory').value.trim();
    
    if (!sourceCategoryId) {
        alert('Please select a source category');
        return;
    }
    
    try {
        // Find source category
        const sourceCategory = categories.find(cat => cat.id === sourceCategoryId);
        if (!sourceCategory) {
            alert('Source category not found');
            return;
        }
        
        // Get channels in source category
        const sourceChannels = channels.filter(ch => 
            ch.parent_id === sourceCategoryId && (ch.type === 0 || ch.type === 2 || ch.type === 15 || ch.type === 13)
        );
        
        if (sourceChannels.length === 0) {
            alert('No channels found in selected category');
            return;
        }
        
        log(`Copying ${sourceChannels.length} channels from category: ${sourceCategory.name}`, 'info');
        
        // Prepare channel data for JSON export
        const channelData = {
            source_server_id: serverId,
            source_server_name: serverData.name,
            source_category_id: sourceCategoryId,
            source_category_name: sourceCategory.name,
            channels: [],
            created_at: new Date().toISOString()
        };
        
        // Process each channel
        for (const sourceChannel of sourceChannels) {
            const channelInfo = {
                id: sourceChannel.id,
                name: sourceChannel.name,
                type: sourceChannel.type,
                type_name: getChannelTypeName(sourceChannel.type),
                position: sourceChannel.position,
                topic: sourceChannel.topic || null,
                nsfw: sourceChannel.nsfw || false,
                bitrate: sourceChannel.bitrate || null,
                user_limit: sourceChannel.user_limit || null,
                slowmode_delay: sourceChannel.rate_limit_per_user || null
            };
            
            channelData.channels.push(channelInfo);
        }
        
        // Generate and download JSON file
        const jsonString = JSON.stringify(channelData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `channels_${sourceCategory.name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        log(`JSON file generated: ${a.download}`, 'success');
        
        // If destination server is provided, create channels there
        if (destinationServerId) {
            log(`Creating channels in destination server: ${destinationServerId}`, 'info');
            
            let created = 0;
            let failed = 0;
            
            // Get destination server channels to find destination category
            let destCategory = null;
            if (destinationCategoryId) {
                try {
                    const destChannels = await discordRequest(`/guilds/${destinationServerId}/channels`);
                    destCategory = destChannels.find(ch => ch.id === destinationCategoryId && ch.type === 4);
                    if (!destCategory) {
                        log(`Warning: Destination category ${destinationCategoryId} not found`, 'warning');
                    }
                } catch (error) {
                    log(`Warning: Could not verify destination category: ${error.message}`, 'warning');
                }
            }
            
            for (const sourceChannel of sourceChannels) {
                try {
                    const channelPayload = {
                        name: sourceChannel.name,
                        type: sourceChannel.type,
                        position: sourceChannel.position
                    };
                    
                    if (sourceChannel.type === 0) {
                        // Text channel
                        channelPayload.topic = sourceChannel.topic || null;
                        channelPayload.nsfw = sourceChannel.nsfw || false;
                        channelPayload.rate_limit_per_user = sourceChannel.rate_limit_per_user || 0;
                    } else if (sourceChannel.type === 2) {
                        // Voice channel
                        channelPayload.bitrate = sourceChannel.bitrate || 64000;
                        channelPayload.user_limit = sourceChannel.user_limit || 0;
                    }
                    
                    if (destCategory) {
                        channelPayload.parent_id = destCategory.id;
                    }
                    
                    const newChannel = await discordRequest(`/guilds/${destinationServerId}/channels`, 'POST', channelPayload);
                    
                    // Update JSON with new channel ID
                    const channelDataEntry = channelData.channels.find(ch => ch.id === sourceChannel.id);
                    if (channelDataEntry) {
                        channelDataEntry.destination_id = newChannel.id;
                        channelDataEntry.destination_name = newChannel.name;
                    }
                    
                    log(`Created channel: ${newChannel.name} (${newChannel.id})`, 'success');
                    created++;
                } catch (error) {
                    log(`Failed to create channel ${sourceChannel.name}: ${error.message}`, 'error');
                    failed++;
                }
                
                // Rate limit protection
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            // Update JSON with results
            channelData.destination_server_id = destinationServerId;
            channelData.destination_category_id = destinationCategoryId || null;
            channelData.created_count = created;
            channelData.failed_count = failed;
            
            // Download updated JSON
            const updatedJsonString = JSON.stringify(channelData, null, 2);
            const updatedBlob = new Blob([updatedJsonString], { type: 'application/json' });
            const updatedUrl = URL.createObjectURL(updatedBlob);
            const updatedA = document.createElement('a');
            updatedA.href = updatedUrl;
            updatedA.download = `channels_${sourceCategory.name.replace(/[^a-z0-9]/gi, '_')}_with_destination_${Date.now()}.json`;
            document.body.appendChild(updatedA);
            updatedA.click();
            document.body.removeChild(updatedA);
            URL.revokeObjectURL(updatedUrl);
            
            log(`Copy complete: ${created} created, ${failed} failed`, created > 0 ? 'success' : 'error');
        } else {
            log(`Channel data exported to JSON file. Total channels: ${sourceChannels.length}`, 'success');
        }
    } catch (error) {
        log(`Error copying channels: ${error.message}`, 'error');
        alert(`Error copying channels: ${error.message}`);
    }
}

function getChannelTypeName(type) {
    const types = {
        0: 'text',
        2: 'voice',
        4: 'category',
        5: 'news',
        13: 'stage',
        15: 'forum'
    };
    return types[type] || 'unknown';
}

// Discohook Integration
async function sendWebhook() {
    const webhookUrl = document.getElementById('webhookUrl').value.trim();
    const content = document.getElementById('messageContent').value.trim();
    const username = document.getElementById('username').value.trim();
    const avatarUrl = document.getElementById('avatarUrl').value.trim();
    
    if (!webhookUrl) {
        alert('Please enter a webhook URL');
        return;
    }
    
    if (!content) {
        alert('Please enter message content');
        return;
    }
    
    try {
        const payload = {
            content: content
        };
        
        if (username) payload.username = username;
        if (avatarUrl) payload.avatar_url = avatarUrl;
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'DiscordServerManager/1.0'
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            log('Webhook message sent successfully', 'success');
            document.getElementById('messageContent').value = '';
        } else {
            const error = await response.json();
            throw new Error(error.message || `HTTP ${response.status}`);
        }
    } catch (error) {
        log(`Failed to send webhook: ${error.message}`, 'error');
        alert(`Failed to send webhook: ${error.message}`);
    }
}

async function sendEmbed() {
    const webhookUrl = document.getElementById('webhookUrl').value.trim();
    const title = document.getElementById('embedTitle').value.trim();
    const description = document.getElementById('embedDescription').value.trim();
    const color = document.getElementById('embedColor').value;
    const footer = document.getElementById('embedFooter').value.trim();
    const imageUrl = document.getElementById('embedImageUrl').value.trim();
    const thumbnailUrl = document.getElementById('embedThumbnailUrl').value.trim();
    
    if (!webhookUrl) {
        alert('Please enter a webhook URL');
        return;
    }
    
    try {
        const embed = {};
        
        if (title) embed.title = title;
        if (description) embed.description = description;
        if (color) embed.color = parseInt(color.replace('#', ''), 16);
        if (imageUrl) embed.image = { url: imageUrl };
        if (thumbnailUrl) embed.thumbnail = { url: thumbnailUrl };
        if (footer) embed.footer = { text: footer };
        
        const payload = {
            embeds: [embed]
        };
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'DiscordServerManager/1.0'
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            log('Embed sent successfully', 'success');
            // Clear form
            document.getElementById('embedTitle').value = '';
            document.getElementById('embedDescription').value = '';
            document.getElementById('embedFooter').value = '';
            document.getElementById('embedImageUrl').value = '';
            document.getElementById('embedThumbnailUrl').value = '';
        } else {
            const error = await response.json();
            throw new Error(error.message || `HTTP ${response.status}`);
        }
    } catch (error) {
        log(`Failed to send embed: ${error.message}`, 'error');
        alert(`Failed to send embed: ${error.message}`);
    }
}

async function createShareLink() {
    const shareData = document.getElementById('shareLinkData').value.trim();
    const resultBox = document.getElementById('shareLinkResult');
    
    if (!shareData) {
        alert('Please enter message data');
        return;
    }
    
    try {
        const data = JSON.parse(shareData);
        
        const response = await fetch(`${DISCOHOOK_API}/share-links`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'DiscordServerManager/1.0'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            const shareUrl = `https://discohook.app/?data=${result.id}`;
            
            resultBox.innerHTML = `
                <strong>Share Link Created:</strong><br>
                <a href="${shareUrl}" target="_blank">${shareUrl}</a>
            `;
            resultBox.classList.add('show');
            log('Share link created successfully', 'success');
        } else {
            const error = await response.json();
            throw new Error(error.message || `HTTP ${response.status}`);
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            alert('Invalid JSON format');
        } else {
            log(`Failed to create share link: ${error.message}`, 'error');
            alert(`Failed to create share link: ${error.message}`);
        }
    }
}

