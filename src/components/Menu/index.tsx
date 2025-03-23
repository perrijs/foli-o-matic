import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import { SELECTED_WORKS } from "src/config/selectedWorks";
import { OTHER_WORKS } from "src/config/otherWorks";
import { AWARDS } from "src/config/awards";
import { SelectedWork, OtherWork, Award } from "src/config/types";

import {
  Wrapper,
  AnimationSpan,
  TableHeader,
  TableHeaders,
  TableSection,
  TableRow,
  TableSectionType,
  TableSectionEntry,
  TableSectionCode,
  ContentWrapper,
} from "./styles";
import CloseButton from "../CloseButton";

interface Props {
  onClose: () => void;
}

const Menu = ({ onClose }: Props) => (
  <Wrapper
    initial={{ y: "-100%" }}
    animate={{ y: "0%" }}
    exit={{ y: "-100%" }}
    transition={{ duration: 1, ease: "easeInOut" }}
  >
    <ContentWrapper>
      <AnimatePresence>
        <AnimationSpan key="table-header">
          <TableHeaders
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 1, duration: 0.33, ease: "easeInOut" }}
          >
            <TableHeader>TYPE</TableHeader>
            <TableHeader>TITLE</TableHeader>
            <TableHeader>CLIENT / ORGANISATION</TableHeader>
            <TableHeader>YEAR</TableHeader>
          </TableHeaders>
        </AnimationSpan>

        <TableSection key="table-section-selected-works">
          <AnimationSpan>
            <TableSectionType
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.05, duration: 0.33, ease: "easeInOut" }}
            >
              SELECTED WORKS /
            </TableSectionType>
          </AnimationSpan>

          {SELECTED_WORKS.map((selectedWork: SelectedWork, index) => (
            <Link
              key={`selectedWork-${index}`}
              href={selectedWork.href}
              passHref={true}
              target="_blank"
            >
              <AnimationSpan>
                <TableRow
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    delay: 1.1 + index * 0.05,
                    duration: 0.33,
                    ease: "easeInOut",
                  }}
                >
                  <TableSectionCode>{selectedWork.code}</TableSectionCode>
                <TableSectionEntry>{selectedWork.name}</TableSectionEntry>
                  <TableSectionEntry>{selectedWork.client}</TableSectionEntry>
                  <TableSectionEntry>
                    {selectedWork.date}

                    <Image
                      src="/images/icons/open_in_new.svg"
                      width="18"
                      height="18"
                      alt=""
                    />
                  </TableSectionEntry>
                </TableRow>
              </AnimationSpan>
            </Link>
          ))}
        </TableSection>

        <TableSection key="table-section-other-works">
          <AnimationSpan>
            <TableSectionType
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.4, duration: 0.33, ease: "easeInOut" }}
            >
              OTHER WORKS /
            </TableSectionType>
          </AnimationSpan>

          {OTHER_WORKS.map((otherWork: OtherWork, index) => (
            <Link
              key={`otherWork-${index}`}
              href={otherWork.url}
              passHref={true}
              target="_blank"
            >
              <AnimationSpan>
                <TableRow
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    delay: 1.4 + index * 0.05,
                    duration: 0.33,
                    ease: "easeInOut",
                  }}
                >
                  <TableSectionCode>{otherWork.code}</TableSectionCode>
                  <TableSectionEntry>{otherWork.name}</TableSectionEntry>
                  <TableSectionEntry>{otherWork.client}</TableSectionEntry>
                  <TableSectionEntry>
                    {otherWork.date}
                    <Image
                      src="/images/icons/open_in_new.svg"
                      width="18"
                      height="18"
                      alt=""
                    />
                  </TableSectionEntry>
                </TableRow>
              </AnimationSpan>
            </Link>
          ))}
        </TableSection>

        <TableSection key="table-section-awards">
          <AnimationSpan>
            <TableSectionType
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.65, duration: 0.33, ease: "easeInOut" }}
            >
              AWARDS & RECOGNITIONS /
            </TableSectionType>
          </AnimationSpan>

          {AWARDS.map((award: Award, index) => (
            <Link
              key={`award-${index}`}
              href={award.url}
              passHref={true}
              target="_blank"
            >
              <AnimationSpan>
                <TableRow
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    delay: 1.65 + index * 0.05,
                    duration: 0.33,
                    ease: "easeInOut",
                  }}
                >
                  <TableSectionCode>{award.code}</TableSectionCode>
                  <TableSectionEntry>{award.name}</TableSectionEntry>
                  <TableSectionEntry>{award.organisation}</TableSectionEntry>
                  <TableSectionEntry>
                    {award.year}
                    <Image
                      src="/images/icons/open_in_new.svg"
                      width="18"
                      height="18"
                      alt=""
                    />
                  </TableSectionEntry>
                </TableRow>
              </AnimationSpan>
            </Link>
          ))}
        </TableSection>
      </AnimatePresence>
    </ContentWrapper>

    <CloseButton onClick={onClose} />
  </Wrapper>
);

export default Menu;
