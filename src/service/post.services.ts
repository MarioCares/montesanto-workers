import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { ICreatePost } from '../interface/createPost';

const connection = (database: D1Database) => new PrismaClient({ adapter: new PrismaD1(database) });

const get = async (database: D1Database) => {
	try {
		const prisma = connection(database);
		return await prisma.post.findMany({
			include: { PostTags: true },
		});
	} catch (error: any) {
		throw new Error(`PostService.get error: ${error}`);
	}
};

const getTags = async (database: D1Database) => {
	try {
		const prisma = connection(database);
		const response = await prisma.postTags.groupBy({
			by: ['description'],
		});
		const tags = response.map((tag: { description: string }) => tag.description);
		return [...new Set(tags)];
	} catch (error: any) {
		throw new Error(`PostService.get error: ${error}`);
	}
};

const post = async (requestData: ICreatePost, database: D1Database) => {
	try {
		const prisma = connection(database);
		const postTags = requestData.tags!.map((tag: string) => ({ description: tag }));
		const postData = { ...requestData, PostTags: { create: postTags } };
		delete postData.tags;

		return await prisma.post.create({
			data: postData,
		});
	} catch (error: any) {
		throw new Error(`PostService.post error: ${error.meta ? error.meta.target : error}`);
	}
};

const deletePost = async (database: D1Database) => {
	try {
		const prisma = connection(database);
		return await prisma.post.deleteMany();
	} catch (error: any) {
		throw new Error(`PostService.get error: ${error}`);
	}
};

export const PostServices = {
	get,
	getTags,
	post,
	deletePost,
};
