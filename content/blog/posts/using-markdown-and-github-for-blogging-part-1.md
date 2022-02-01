---
title: Using Markdown and GitHub for Blogging - Part 1
date: 2021-05-16
topics:
  - team
authors:
  - Hongsup Shin
---
Our TJI volunteer team has grown over the last year. We have new volunteers who are working on various projects. With this growth, I've started thinking about a blog where volunteers like myself can document and publish our work easily and efficiently.

Blogging is useful in many ways. First, it highlights a volunteer's work in their own words and gives them credit. This process enables the continued professional development of team members who are interested in learning new things. Second, it allows us to communicate with various readers such as tech workers, policy makers, social scientists, community members, and so on. This way, we can help other non-profits like us as well. Finally, similar to our existing workflow, drafts can be reviewed by our team members before publishing so that our writings are robust and knowledge transfer happens naturally during the process.

## Blogging in markup languages

We discussed how to formalize a publication and review process. Previously, we've used Google Docs to write, edit, and review our drafts. Our review process has been pretty standard; reviewers commented on a certain part of a draft, which was shown in the margin.

Instead of Google Docs, I suggested using **markup languages** such as Markdown or reStructuredText, which are commonly used in software development. Compared with existing word processor software such as MS Word or Google Docs, using markup languages can be somewhat challenging to first-time users. You need to learn the syntax and sometimes a bit of html and css knowledge is also required to get the style right.

However, I think these benefits outweigh those challenges:

* It is possible to use a version control tool to track changes easily.
* Every styling is written explicitly (e.g., `**<text>**` for bold text) and thus easily discoverable.
* It is easy to include code snippets in the post and they are automatically rendered in a standardized way.
* It is easy and fast to publish drafts online.
* With a document builder, we can convert a draft into various printable formats.

## Reviewing blog posts on GitHub

Once blog posts are written in markup languages, we can use a version control system such as git to track changes. This makes the blog review process similar to code review in software development. Then it's possible for our volunteers to collaborate on a blog post through GitHub.

Some of you may feel skeptical about this approach because you might know GitHub primarily as a platform for code repositories. I understand this perspective, because that's exactly how I felt when I was asked to submit a manuscript as a ReStructuredText document at the [Scientific Computing with Python (SciPy) conference](http://conference.scipy.org/) in 2019. However, after going through the process from both ends – as an author in 2019 and a reviewer last year – I've come to really enjoy the process.

At the SciPy 2019 conference, [I submitted my manuscript as a pull request](https://github.com/scipy-conference/scipy_proceedings/pull/468) to their proceedings repository. I wrote a manuscript as a ReStructuredText file and attached figures as separate files, and two reviewers reviewed my manuscript.

![](https://res.cloudinary.com/texas-justice-initiative/image/upload/v1610936101/Blog/HS_scipy_example_author_screenshot_tmb02n.png "Screenshot of my pull request at the SciPy 2019")

Last year, I was on the opposite end of the process and [reviewed a paper that was submitted as a pull request](https://github.com/scipy-conference/scipy_proceedings/pull/550).

![](https://res.cloudinary.com/texas-justice-initiative/image/upload/v1610936101/Blog/HS_scipy_example_reviewer_screenshot_z7rqqs.png "Screenshot of a pull request that I reviewed at the SciPy 2020")

Based on these experiences, I found the following benefits:

1. **Exact exchanges between the original and the revised are easily discoverable.** This is useful especially if a manuscript goes through multiple revisions.
2. **Switching to a previous version of the manuscript is seamless.** It's easy go back and forth between different versions of manuscripts and this **prevents people from creating multiple copies (files)** of the manuscript.
3. **Communications and decision-making processes are tracked with the manuscript.** MS Word and Google Doc don't provide much physical space for lengthy communications. Thus you often need to accept previous comments to remove the visual clutter and then those comments disappear. You can use email but then your communication exists separately.
4. **Non-authors can't edit the manuscript without authors' permission.** Only authors can make changes to the manuscript. This doesn't mean that they have all the power though because reviewers' approval is needed for publication (i.e., pull request merged).
5. **Group communication is available.** Normally reviewers don't talk to each other but comments can make a group communication easier. This way, we can have a discussion and develop better ideas together. It also prevents reviewers from being siloed.
6. **Review process is transparent**. Because of GitHub's great traceability, public repositories like ours will allow others to see our review process including the communication history.
7. **Reviewing technical material is easy.** It's easy to incorporate code snippets, hyperlinks, etc. and they are all visible in the manuscript.
8. **Everything exists in one place.** Normally non-document type files exist in a different place. However, this way, we can keep our blog post, documentation, and our code all in the same place.

## How it Works

### Authors

Write a blog post in a markup language by using any text editors. Once done, submit the manuscript for review as [a pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). At the pull request page, assign reviewers. To write a post in a markup language, you have to know the syntax. To submit it as pull request, you have to have a bit of knowledge on how to use git.

### Reviewers

In a pull request page, you can check who are assigned as reviewers. If you are assigned, you will see your ID. [GitHub Docs](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/reviewing-changes-in-pull-requests) has detailed information on how to review changes. Keep in mind that even though you will have to read the manuscript in a markup language format, you can still check its rendered version by clicking "View File" option in the menu.

### From Pull Request to Merge

Once the usual back-and-forth review process begins, reviewers make comments and requests for changes, and authors either accept them or make rebuttal. This process will be documented through comments and every piece of communication is tracked. Once everyone is satisfied, we make a collective decision to merge the pull request and it becomes a part of the master branch. Once this is done, we have several options. We can use several existing services to publish our repository directly as a website, or do something more sophisticated.