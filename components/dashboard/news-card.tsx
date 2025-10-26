"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewsItem } from "@/types";

interface NewsCardProps {
  news: NewsItem[];
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Internal News</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            >
              <Link
                href={`/admin/news/${item.id}`}
                className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(item.publishedAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="link" className="w-full" asChild>
            <Link href="/admin/news">View All</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
