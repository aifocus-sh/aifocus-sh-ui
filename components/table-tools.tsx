import { FingerprintIcon, LollipopIcon, TabletsIcon, WavesIcon, WebcamIcon } from "./icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function TableTools() {
  return (
    <div className="w-full mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>01</TableCell>
            <TableCell className="flex items-center space-x-2">
              <WebcamIcon className="w-4 h-4" />
              <span>Chaat GPT</span>
            </TableCell>
            <TableCell>Search Engine</TableCell>
            <TableCell>$20/mo</TableCell>
            <TableCell>Freemium</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>02</TableCell>
            <TableCell className="flex items-center space-x-2">
              <FingerprintIcon className="w-4 h-4" />
              <span>Fliki</span>
            </TableCell>
            <TableCell>Video Generator</TableCell>
            <TableCell>$8/mo</TableCell>
            <TableCell>Freemium</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>03</TableCell>
            <TableCell className="flex items-center space-x-2">
              <LollipopIcon className="w-4 h-4" />
              <span>Namelix</span>
            </TableCell>
            <TableCell>Business Name</TableCell>
            <TableCell>Startup tools</TableCell>
            <TableCell>Free</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>04</TableCell>
            <TableCell className="flex items-center space-x-2">
              <WavesIcon className="w-4 h-4" />
              <span>Writesonic</span>
            </TableCell>
            <TableCell>SEO Content</TableCell>
            <TableCell>$12.67/mo</TableCell>
            <TableCell>Freemium</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>05</TableCell>
            <TableCell className="flex items-center space-x-2">
              <TabletsIcon className="w-4 h-4" />
              <span>Tome</span>
            </TableCell>
            <TableCell>Story Teller</TableCell>
            <TableCell>Startup tools</TableCell>
            <TableCell>Free</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}