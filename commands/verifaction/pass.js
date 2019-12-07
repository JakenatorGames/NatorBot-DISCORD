var roblox = require('noblox.js');

let config = require('../config.js');

const Discord = require('discord.js')


module.exports = {
    name: "pass",
    category: "verifaction",
    description: "To pass",
    run: async(client, message, args) => {

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Only MR/HR can rank people!")

var groupId = 4392055;

var maximumRank = 255;

let staffc = message.guild.channels.find("name", "moderation-logs") 


roblox.cookieLogin(config.cookie);


    	var username = args[0]

    	if (username){

    		roblox.getIdFromUsername(username)

			.then(function(id){

				roblox.getRankInGroup(groupId, id)

			        

				.then(function(rank){

					if(maximumRank <= rank){

						message.channel.send(`${id} is rank ${rank} and not passable.`)

					} else {

						roblox.setRank(groupId, id, 2)

						.then(function(roles){

							message.channel.send(`Passed user ${username}, rank changed from ${roles.oldRole.Name} to ${roles.newRole.Name}`)

							const embed = new Discord.RichEmbed()

							    .setColor(0x8cff00)

							    .setTimestamp()

							    .setDescription(`**Action:** Pass\n**Target:** ${username}\n**User:** ${message.author.tag}\n**Old Rank:** ${roles.oldRole.Name}\n**New Rank:** ${roles.newRole.Name}`);

							staffc.send({embed});

						}).catch(function(err){

							message.channel.send("User passed.")

						});

					}

				}).catch(function(err){

					message.channel.send("Couldn't get them in the group.")

				});

			}).catch(function(err){ 

				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)

			});

    	} else {

    		message.channel.send("Please enter a username.")

    	}

    	return;

}}