
export default class Message {
	constructor(client, config={}){
		this.client = client
		this.config = config
		
		this.userId = config?.userId || null
		this.channelId = config?.channelId || null
		this.messageId = config?.messageId || null
		this.serverId = config?.serverId || null
		this.content = config?.content || null
	}
	
	reply(choose){
		
		let user, dm, message, guild, channel;
		switch(choose){
			case 'dm':
				user = await this.client.users.cache.get(this.userId)
				dm = await user.createDM()
				message = await dm.messages.fetch(this.messageId)
				await message.reply(this.content)
				return {
					success: true,
					message:'Başarılı',
					content: this.content,
					user: user
				}	
			case 'guild':
				guild = await bot.client.guilds.cache.get(this.serverId)
				channel = await guild.channels.fetch(this.channelId)
				message = await channel.messages.fetch(this.messageId)
				await message.reply(this.content)
				
				return {
					success: true,
					message:'Başarılı',
					content: this.content,
					channel: channel
				}
			default '':
				return {
					success: false
				}
		}
	
	}

	send(choose){
		
		switch(choose){
			
			let user, guild, channel
			
			case 'dm':
				user = await this.client.users.cache.get(this.userId)
				await user.send(this.content)
				return {
					success: true,
					message: 'DM Başarıyla gönderildi.',
					user: user,
					content: this.content
				}
			case 'guild':
				guild = await this.client.guilds.cache.get(this.serverId)
				channel = await guild.channels.fetch(this.channelId)
				await channel.send(this.content)
				return {
					success: true,
					message: 'Başarılı',
					channel: channel,
					content: this.content
				}
			default:
				return {
					success: false
				}
		}
		
		
	}
	
	getMessages(choose){
		switch(choose){
			let dm, user, messages, guild, channel
			case 'dm':
				user = await this.client.users.cache.get(this.userId)
				dm = await user.createDM()
				messages = await dm.messages.fetch({ limit: 100 })
				return {
					success: true,
					message: 'Başarılı',
					messages: messages
				}
			case 'guild':
				guild = await this.client.guilds.cache.get(this.serverId)
				channel = await guild.channels.fetch(this.channelId)
				messages = await channel.messages.fetch({ limit: 100 })
				return {
					success: true,
					message: 'Başarılı',
					messages: messages
				}
			default:
				return {
					success: false
				}
		}
	}
}