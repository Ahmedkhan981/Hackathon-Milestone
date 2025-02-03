"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-4xl md:text-6xl font-bold text-slate-800 mb-8"
        >
          About Our Company
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQYMJNDgRTM2cBDBsZ6Ih7dvub_4L__1EBw&s"
              alt="Team photo"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-semibold text-slate-700">
              Our Mission
            </h2>
            <p className="text-lg text-slate-700">
              At our core, we strive to innovate and push the boundaries of what
              &lsquo; s possible. Our mission is to create products that not only
              meet but exceed our customers &lsquo; expectations, all while
              fostering a culture of creativity and collaboration.
            </p>
            <h2 className="text-3xl font-semibold text-slate-700">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-lg text-slate-700 space-y-2">
              <li>Innovation in everything we do</li>
              <li>Customer satisfaction as our top priority</li>
              <li>Integrity and transparency in all our actions</li>
              <li>Continuous learning and improvement</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-semibold text-slate-700 mb-6 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-baseline">
            {[
              { name: "Marie Curie", role: "CEO", image: "/1.jpg" },
              { name: "John Deo", role: "CTO", image: "/2.jpg" },
              {
                name: "Mike Johnson",
                role: "Lead Designer",
                image: "/3.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-slate-700">
                  {member.name}
                </h3>
                <p className="text-slate-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-semibold text-slate-700 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-700 mb-4">
            We &lsquo; d love to hear from you! Reach out to us for any inquiries
            or collaborations.
          </p>
          <Link
            href={`/contact`}
            className="inline-block bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-700 transition duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default About;
