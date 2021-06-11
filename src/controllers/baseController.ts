/**
 * MIT License
 *
 * Copyright (c) 2020 Lena Voytek
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Document: baseController.ts
 *
 * Overview: This document handles the logic within router endpoints
 */

import { Request, Response } from 'express';

import { project } from '../models/project';
import { baseModel } from '../models/baseModel';
import { requestHandlers } from './requestHandlers';

export class BaseController {
	public serveIndex(req: Request, res: Response) {
		res.render("index", { mobile: requestHandlers.isRequestFromMobile(req) });
	}

	public serveProjects(req: Request, res: Response) {
		project.find({}, (err, items) => {
			if (err)
				res.render("projects", { projects: [], editor: false, mobile: requestHandlers.isRequestFromMobile(req) });
			else
				res.render("projects", { projects: items, editor: false, mobile: requestHandlers.isRequestFromMobile(req) });
		});
	}


	public serveResume(req: Request, res: Response) {
		res.render("resume", { mobile: requestHandlers.isRequestFromMobile(req) });
	}

	public serveAbout(req: Request, res: Response) {
		const skills = [
			{ imagelink: "/images/skills/c.png", link: "#", name: "C" },
			{ imagelink: "/images/skills/cpp.png", link: "#", name: "C++" },
			{ imagelink: "/images/skills/cs.png", link: "#", name: "C#" },
			{ imagelink: "/images/skills/verilog.png", link: "#", name: "Verilog" },
			{ imagelink: "/images/skills/typescript.png", link: "#", name: "TypeScript" },
			{ imagelink: "/images/skills/javascript.png", link: "#", name: "JavaScript" },
			{ imagelink: "/images/skills/python.png", link: "#", name: "Python" },
			{ imagelink: "/images/skills/java.png", link: "#", name: "Java" }
		];

		res.render("about", { mobile: requestHandlers.isRequestFromMobile(req), skills });
	}

	public addBaseItem(req: Request, res: Response) {
		const newItem = new baseModel(req.body);
		newItem.save((err, item) => {
			if (err)
				res.status(400).json({ "error": err });
			else
				res.status(200).json({ "message": "success", "item": item });
		});
	}

	public getAllBaseItems(req: Request, res: Response) {
		baseModel.find({}, (err, items) => {
			if (err)
				res.status(500).json({ "error": err });
			else
				res.status(200).json(items);
		});
	}
}